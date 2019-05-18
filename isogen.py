#!/usr/bin/env python3

import sys
import numpy as np
import math
from colors import COLORS


def get_rgb(arg):
    if isinstance(arg, str):
        arg = arg.lstrip('#')
        return tuple(int(arg[i:i + 2], 16) for i in (0, 2, 4))
    elif isinstance(arg, tuple) or isinstance(arg, list):
        h = arg[0]
        c = arg[1] * arg[2]
        x = c * (1.0 - math.fabs(math.fmod(h / 60.0, 2.0) - 1.0))
        m = arg[2] - c
        if h < 60:
            return ((c + m)*1, (x + m)*1, m*1)
        elif h < 120:
            return ((x + m)*1, (c + m)*1, m*1)
        elif h < 180:
            return (m*1, (c + m)*1, (x + m)*1)
        elif h < 240:
            return (m*1, (x + m)*1, (c + m)*1)
        elif h < 300:
            return ((x + m)*1, m*1, (c + m)*1)
        else:
            return ((c + m)*1, m*1, (x + m)*1)

def get_int(color):
    return (color[0] << 16) + (color[1] << 8) + color[2]


def print_escape(colors):
    for color in colors:
        print(
            "\033[48;2;{};{};{}m  \033[0m".format(color[0], color[1], color[2]),
            end='')
    print()

def print_c(colors):
    print("{",end='')
    for color in colors:
        print("0x{:06x}".format(get_int(color)), end=', ')
    print("}",end='\n')


def get_hsv(color):
    # color = (color[0] / 255, color[1] / 255, color[2] / 255)
    c_max = max(color)
    c_min = min(color)
    delta = c_max - c_min
    h, s, v = 0, 0, 0
    if delta == 0:
        h = 0
    elif c_max == color[0]:
        h = 60 * math.fmod((color[1] - color[2]) / delta, 6.0)
    elif c_max == color[1]:
        h = 60 * ((color[2] - color[0]) / delta + 2)
    elif c_max == color[2]:
        h = 60 * ((color[0] - color[1]) / delta + 4)
    if h < 0:
        h += 360
    if c_max == 0:
        s = 0
    else:
        s = delta / c_max
    v = c_max
    return [h, s, v]

def angle_diff_cw(start, end):
    if(start <= end):
        return end - start
    return 260.0 + end - start

def angle_diff_ccw(start, end):
    if(end <= start):
        return end - start
    else:
        return -360.0 - start + end

def angle_diff_min(start, end):
    cw = angle_diff_cw(start, end)
    ccw = angle_diff_ccw(start, end)
    if(math.fabs(cw > math.fabs(ccw))):
        return ccw
    return cw


def gen_grad(start, end, t, hsv):
    if hsv:
        start = get_hsv(start)
        end = get_hsv(end)
        dh = angle_diff_min(start[0], end[0])
        # dh = end[0] - start[0]
        ds = end[1] - start[1]
        dv = end[2] - start[2]
        h = (t * dh) + start[0]
        h = math.fmod(h, 360.0)
        if h < 0:
            h += 360.0
        color = (h,
                 ((t * ds) + start[1]),
                 ((t * dv) + start[2]))
        color = get_rgb(color)
        return (int(color[0]), int(color[1]), int(color[2]))
    else:
        return (int(t * (end[0] - start[0]) + start[0]),
                int(t * (end[1] - start[1]) + start[1]),
                int(t * (end[2] - start[2]) + start[2]))


def gen_gradient(colors, steps, hsv):
    step = 1.0 / (len(colors) - 1)
    grad = []
    for t in np.linspace(0, 1.0, steps):
        index = int(t / step)
        t = (1.0 / (((index + 1) * step) - (index * step))) * (t -
                                                               (index * step))
        if index == len(colors) - 1:
            grad.append(colors[-1])
        else:
            grad.append(gen_grad(colors[index], colors[index + 1], t, hsv))
    return grad


def main():
    colors = []
    steps = 255
    color = False
    cout = False
    hsv = False
    for arg in sys.argv[1:]:
        if arg in COLORS:
            colors.append(get_rgb(COLORS[arg]))
        elif arg.isdigit():
            steps = int(arg)
        elif arg.startswith('--'):
            arg = arg[2:]
            if arg == "color":
                color = True
            elif arg == "no-color":
                color = False
            elif arg == "c":
                cout = True
            elif arg == "no-c":
                cout = False
            elif arg == "hsv":
                hsv = True
            elif arg == "rgb":
                hsv = False
        else:
            colors.append(get_rgb(arg))
    grad = gen_gradient(colors, steps, hsv)
    if color:
        print_escape(colors)
        print_escape(grad)
    if cout:
        print_c(grad)


if __name__ == "__main__":
    main()
