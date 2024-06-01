# Bambu-P1S-slow-down-chamber-fan
Nodejs program to change every configuration file to change chamber fan speed to half (so that it's not so noisy)

Camera fan is way too noisy when speed is more than 50%. During every print I used to slow it down to no more than 50%, without affecting in any way the quality of the objects printed.
To avoid this boring operation every time I've written this code that scans every JSON file into the configuration directory, searching for "M106 P3 S" commands (set chamber fan speed) and replacing the value to half.
Simply put the program in the main configuration directory ( on windows 11 it is in "C:\Users\{youruserdir}\AppData\Roaming\BambuStudio" ) and run
