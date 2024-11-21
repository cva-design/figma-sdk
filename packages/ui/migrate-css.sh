#!/bin/bash

# Ensure we're in the components directory
COMPONENTS_DIR="src/lib/components"
if [ ! -d "$COMPONENTS_DIR" ]; then
    echo "Error: Components directory not found at $COMPONENTS_DIR"
    exit 1
fi

# Function to process a component directory
process_component_dir() {
    local dir="$1"
    local component_name=$(basename "$dir")
    
    # Find all CSS files in the component directory
    find "$dir" -name "*.css" | while read css_file; do
        # Get the base name without extension
        base_name=$(basename "$css_file" .css)
        
        # Look for corresponding Svelte file
        svelte_file="$dir/$base_name.svelte"
        
        if [ -f "$svelte_file" ]; then
            echo "Processing $css_file -> $svelte_file"
            
            # Check if file already has a style tag
            if grep -q "<style.*>" "$svelte_file"; then
                echo "Warning: $svelte_file already has a style tag. Skipping..."
                continue
            fi
            
            # Create backup
            cp "$svelte_file" "$svelte_file.bak"
            
            # Preserve original content and add style tag
            {
                cat "$svelte_file"
                echo ""
                echo "<style lang=\"scss\">"
                cat "$css_file"
                echo "</style>"
            } > "$svelte_file.tmp"
            
            # Replace original file
            mv "$svelte_file.tmp" "$svelte_file"
            
            # Create backup of CSS file before removing
            mv "$css_file" "$css_file.bak"
            
            echo "✓ Processed $base_name"
        else
            echo "Warning: No matching Svelte file found for $css_file"
        fi
    done
}

# Find all component directories and process each one
for dir in "$COMPONENTS_DIR"/*/; do
    if [ -d "$dir" ]; then
        echo "Processing component directory: $dir"
        process_component_dir "$dir"
    fi
done

echo "Done! CSS files have been moved to their Svelte components."
echo "Backup files have been created with .bak extension" 