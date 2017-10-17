#
# Build script for Linux
#
# Run in current folder without parameters.
# Requires zip to be installed.
# Deletes and repackages add-on .xpi file.
#

#!/bin/bash
rm ./custom-titlebar-text.xpi
zip -r custom-titlebar-text.xpi ./manifest.json ./LICENSE ./README.md ./icons ./custom-titlebar-text.js ./preferences*
