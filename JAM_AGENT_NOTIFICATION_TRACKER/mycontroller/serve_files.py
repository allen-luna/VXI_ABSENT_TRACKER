from django.http import HttpResponse, Http404
from django.conf import settings
import os

def serve_css(request):
    css_path = os.path.join(settings.REACT_APP_DIR, 'dist', 'assets', 'index-DV5S2IGP.css')
    try:
        with open(css_path, 'rb') as f:
            content = f.read()
        return HttpResponse(content, content_type='text/css')
    except FileNotFoundError:
        raise Http404("CSS file not found")

def serve_js(request):
    js_path = os.path.join(settings.REACT_APP_DIR, 'dist', 'assets', 'index-DnF1EjLV.js')
    try:
        with open(js_path, 'rb') as f:
            content = f.read()
        return HttpResponse(content, content_type='application/javascript')
    except FileNotFoundError:
        raise Http404("JavaScript file not found")
    
def serve_logo(request):
    logo_path = os.path.join(settings.REACT_APP_DIR, 'dist', 'assets', 'VXI_Logo 1-BsslRYVi.png')
    try:
        with open(logo_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='image/png')
    except FileNotFoundError:
        return HttpResponse(status=404)

def serve_footer(request):
    logo_path = os.path.join(settings.REACT_APP_DIR, 'dist', 'assets', 'VXIFooter-wDuAYXk4.png')
    try:
        with open(logo_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='image/png')
    except FileNotFoundError:
        return HttpResponse(status=404)
    
def serve_ico(request):
    logo_path = os.path.join(settings.REACT_APP_DIR, 'dist', 'assets', 'VXI-DfDsUEYA.ico')
    try:
        with open(logo_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='image/x-icon')
    except FileNotFoundError:
        return HttpResponse(status=404)