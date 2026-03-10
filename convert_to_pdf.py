#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def create_pdf_from_text(input_file, output_file):
    """
    Konwertuje plik tekstowy na PDF z polskimi znakami
    """
    
    # Tworzenie dokumentu PDF
    doc = SimpleDocTemplate(output_file, pagesize=A4,
                            rightMargin=72, leftMargin=72,
                            topMargin=72, bottomMargin=18)
    
    # Przygotowanie stylów
    styles = getSampleStyleSheet()
    
    # Styl dla tytułu
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    # Styl dla nagłówków sekcji
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12,
        spaceBefore=20
    )
    
    # Styl dla tekstu głównego
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6,
        alignment=TA_LEFT
    )
    
    # Lista elementów do dodania do PDF
    story = []
    
    # Czytanie pliku tekstowego
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Błąd: Nie można znaleźć pliku {input_file}")
        return False
    except UnicodeDecodeError:
        # Próba z kodowaniem windows-1250
        try:
            with open(input_file, 'r', encoding='windows-1250') as f:
                content = f.read()
        except:
            print(f"Błąd: Nie można odczytać pliku {input_file}")
            return False
    
    # Podział tekstu na linie
    lines = content.split('\n')
    
    # Przetwarzanie każdej linii
    for line in lines:
        line = line.strip()
        
        if not line:  # Pusta linia
            story.append(Spacer(1, 6))
        elif line.startswith('=') or '=' in line:  # Linia z równakami - tytuł główny
            if len(line) > 10:  # Jeśli to nie jest sama linia separatora
                title_text = line.replace('=', '').strip()
                if title_text:
                    story.append(Paragraph(title_text, title_style))
        elif line.startswith('-') and len(line) > 3:  # Linia z myślnikami - nagłówek sekcji
            heading_text = line.replace('-', '').strip()
            if heading_text:
                story.append(Paragraph(heading_text, heading_style))
        elif line.endswith(':'):  # Linia kończąca się dwukropkiem - nagłówek
            story.append(Paragraph(line, heading_style))
        else:  # Zwykły tekst
            story.append(Paragraph(line, normal_style))
    
    # Generowanie PDF
    try:
        doc.build(story)
        print(f"Plik PDF został utworzony: {output_file}")
        return True
    except Exception as e:
        print(f"Błąd podczas tworzenia PDF: {e}")
        return False

if __name__ == "__main__":
    input_file = "wynik.txt"
    output_file = "wynik.pdf"
    
    success = create_pdf_from_text(input_file, output_file)
    if success:
        print("Konwersja zakończona pomyślnie!")
    else:
        print("Wystąpił błąd podczas konwersji.")