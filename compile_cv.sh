#!/bin/bash

# CV Compilation Script
echo "Compiling CV..."

# Check if pdflatex is installed
if ! command -v pdflatex &> /dev/null; then
    echo "Error: pdflatex is not installed."
    echo "Please install a LaTeX distribution like TeX Live or MiKTeX."
    exit 1
fi

# Compile the CV with correct format
pdflatex -fmt=pdflatex cv.tex
pdflatex -fmt=pdflatex cv.tex  # Run twice for proper references

# Clean up auxiliary files
rm -f cv.aux cv.log cv.out

echo "CV compiled successfully! Check cv.pdf"