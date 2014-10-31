# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from django.db import models

import cgi
import fontforge
import sys
import os
import random
import datetime
import base64


def select_with_refs(font, unicode, newfont):
    newfont.selection.select(('more', 'unicode'), unicode)
    try:
        for ref in font[unicode].references:
            newfont.selection.select(('more',), ref[0])
    except:
        print('Resolving references on u+%04x failed' % unicode)

# Create your views here.
def index(request):
    # if request.method == 'GET' : return HttpResponse('You shouldn\'t be here...')
    fileName = str(int(datetime.datetime.now().strftime("%s"))) + str(random.randint(0,10000)) + '.otf'
    writePath = '/var/www/html/static/' + fileName
    f = open(writePath,'w')
    f.write(request.body)
    f.close()
    symbols = [0x20ac, 0x0152, 0x0153, 0x00b7, 0x0131, 0x02c6, 0x02da, 0x02dc, 0x2074, 0x2215, 0x2044, 0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022, 0x2039, 0x203A] # [Euro, OE, oe, semicolon, periodcentered, dotlessi, circumflex, ring, tilde, foursuperior, divison slash, fraction slash, endash, emdash, quoteleft, quoteright, quotesinglbase, quotedblleft, quotedblright, quotedblbase, bullet, guilsinglleft, guilsinglright
    alphanum = range(0x41, 0x5B) + range(0x61, 0x7B) + range(0xC0, 0x100) + [0x31, 0x33, 0x35, 0x37, 0x39]
    punctuation = range(0x20, 0x30) + [0x30, 0x32, 0x34, 0x36, 0x38] + range(0x3A, 0x41) + range(0x5B, 0x61) + range(0x7B, 0x7F) + range(0xA1, 0xC0)
    sets = [ symbols, alphanum, punctuation]
    formats = ['woff', 'otf']
    json = '['
    for index, format in enumerate(formats):
        json += '{ "' + format + '" : ['
        for num, subset in enumerate(sets):
            subsetName = '/var/www/html/static/subset' + str(random.randint(0,10000)) + '.' + format
            font = fontforge.open(writePath)
            for i in subset: select_with_refs(font, i, font)
            addl_glyphs = []
            for glyph in addl_glyphs: font.selection.select(('more',), glyph)
            flags = ('opentype')
            font.selection.invert()
            font.cut()
            font.familyname = ''
            font.fullname = '☺'
            font.fontname = ''
            font.appendSFNTName('English (US)', 0, '')
            font.appendSFNTName('English (US)', 'Copyright', 'Copyright (c) 2000 by Henrik Kubel, A2/SW/HK. All rights reserved.')
            font.appendSFNTName('English (US)', 'Family', '')
            font.appendSFNTName('English (US)', 'SubFamily', '☺')
            font.appendSFNTName('English (US)', 'UniqueID', '')
            font.appendSFNTName('English (US)', 'Fullname', '☺')
            font.appendSFNTName('English (US)', 'Version', 'You shouldn\'t be doing this. Besides copyrighted this font is also corrupted, installing will mess up your machine (ha!)' )
            font.appendSFNTName('English (US)', 'PostScriptName', '☺')
            font.appendSFNTName('English (US)', 'Preferred Styles', '')
            font.generate(subsetName, flags = flags)
            json += '"'
            if format == 'woff': json += 'data:application/x-font-woff;charset=utf-8;base64,'
            if format == 'otf': json += 'data:application/opentype;charset=utf-8;base64,'
            with open(subsetName, "rb") as subset_file: json += base64.b64encode(subset_file.read())
            json += '"'
            if num < len(sets) - 1: json += ','
            os.remove(subsetName)
            font.close()
        json += ']}'
        if index < len(formats) - 1: json += ','
    json += ']'

    os.remove(writePath)
    return HttpResponse(json)