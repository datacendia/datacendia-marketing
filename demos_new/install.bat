@echo off
echo Moving new demos into place...
copy /y "d:\Datacedia_Marketing\demos_new\dissent.html" "d:\Datacedia_Marketing\demos\dissent.html"
copy /y "d:\Datacedia_Marketing\demos_new\crucible.html" "d:\Datacedia_Marketing\demos\crucible.html"
copy /y "d:\Datacedia_Marketing\demos_new\decision-dna.html" "d:\Datacedia_Marketing\demos\decision-dna.html"
copy /y "d:\Datacedia_Marketing\demos_new\qr-bridge.html" "d:\Datacedia_Marketing\demos\qr-bridge.html"
copy /y "d:\Datacedia_Marketing\demos_new\shadow-council.html" "d:\Datacedia_Marketing\demos\shadow-council.html"
copy /y "d:\Datacedia_Marketing\demos_new\pre-mortem.html" "d:\Datacedia_Marketing\demos\pre-mortem.html"
copy /y "d:\Datacedia_Marketing\demos_new\sports-governance.html" "d:\Datacedia_Marketing\demos\sports-governance.html"
copy /y "d:\Datacedia_Marketing\demos_new\healthcare-governance.html" "d:\Datacedia_Marketing\demos\healthcare-governance.html"
copy /y "d:\Datacedia_Marketing\demos_new\legal-governance.html" "d:\Datacedia_Marketing\demos\legal-governance.html"
del "d:\Datacedia_Marketing\demos\dissent_new.html" 2>nul
echo Done! All 9 demos updated.
pause
