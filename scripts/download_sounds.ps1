# PowerShell script to download OpenGameArt CC0 sound files for TimerQuest

$soundsDir = Join-Path $PSScriptRoot "..\public\sounds"
if (-not (Test-Path $soundsDir)) {
    New-Item -ItemType Directory -Path $soundsDir | Out-Null
    Write-Host "Created sounds directory at $soundsDir"
}

$tempDir = Join-Path $PSScriptRoot "..\temp_sounds"
if (-not (Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir | Out-Null
}

# Download direct files
Write-Host "Downloading Bear Growl (silent_beast_growl)..."
Invoke-WebRequest -Uri "https://opengameart.org/sites/default/files/silent_beast_growl.mp3" -OutFile (Join-Path $soundsDir "bear.mp3") -UseBasicParsing

Write-Host "Downloading Kitty Meow (cat_mewfood)..."
Invoke-WebRequest -Uri "https://opengameart.org/sites/default/files/cat_mewfood.wav" -OutFile (Join-Path $soundsDir "kitty.wav") -UseBasicParsing

Write-Host "Downloading Bunny Munch (RabbitEating)..."
Invoke-WebRequest -Uri "https://opengameart.org/sites/default/files/RabbitEating.wav" -OutFile (Join-Path $soundsDir "bunny.wav") -UseBasicParsing

# Download squeak_toy.zip
Write-Host "Downloading Squeak Toy Zip..."
$squeakZip = Join-Path $tempDir "squeak_toy.zip"
Invoke-WebRequest -Uri "https://opengameart.org/sites/default/files/squeak_toy.zip" -OutFile $squeakZip -UseBasicParsing
Expand-Archive -Path $squeakZip -DestinationPath $tempDir -Force

# Copy squeak file
$squeakFile = Get-ChildItem -Path $tempDir -Filter "*.wav" -Recurse | Select-Object -First 1
if ($squeakFile) {
    Copy-Item $squeakFile.FullName (Join-Path $soundsDir "panda.wav") -Force
    Write-Host "Panda sound extracted: $($squeakFile.Name)"
}

# Download bfxr_sounds.zip
Write-Host "Downloading BFXR Platformer Sounds Zip..."
$bfxrZip = Join-Path $tempDir "bfxr_sounds.zip"
Invoke-WebRequest -Uri "https://opengameart.org/sites/default/files/bfxr_sounds.zip" -OutFile $bfxrZip -UseBasicParsing
$bfxrExtract = Join-Path $tempDir "bfxr"
Expand-Archive -Path $bfxrZip -DestinationPath $bfxrExtract -Force

# Copy jump/spring sound -> break.wav
$jump = Get-ChildItem -Path $bfxrExtract -Filter "*jump*" -Recurse | Select-Object -First 1
if ($jump) {
    Copy-Item $jump.FullName (Join-Path $soundsDir "break.wav") -Force
    Write-Host "Break sound extracted: $($jump.Name)"
}

# Copy coin/success sound -> tada.wav
$coin = Get-ChildItem -Path $bfxrExtract -Filter "*coin*" -Recurse | Select-Object -First 1
if ($coin) {
    Copy-Item $coin.FullName (Join-Path $soundsDir "tada.wav") -Force
    Write-Host "Tada sound extracted: $($coin.Name)"
}

# Copy blip/select sound -> click.wav
$blip = Get-ChildItem -Path $bfxrExtract -Filter "*blip*" -Recurse | Select-Object -First 1
if (-not $blip) { $blip = Get-ChildItem -Path $bfxrExtract -Filter "*select*" -Recurse | Select-Object -First 1 }
if (-not $blip) { $blip = Get-ChildItem -Path $bfxrExtract -Filter "*click*" -Recurse | Select-Object -First 1 }
if ($blip) {
    Copy-Item $blip.FullName (Join-Path $soundsDir "click.wav") -Force
    Write-Host "Click sound extracted: $($blip.Name)"
}

# Copy short sound -> tick.wav (Randomize3 or similar)
$tick = Get-ChildItem -Path $bfxrExtract -Filter "*Random*" -Recurse | Select-Object -First 1
if ($tick) {
    Copy-Item $tick.FullName (Join-Path $soundsDir "tick.wav") -Force
    Write-Host "Tick sound extracted: $($tick.Name)"
}

# Cleanup temp folder
if (Test-Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force | Out-Null
}

Write-Host "All sound files downloaded and extracted to $soundsDir successfully!"
