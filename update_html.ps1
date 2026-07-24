$base = "C:\Users\kumar\.gemini\antigravity\scratch\portfolio_site"
foreach ($cat in @("digital_media", "mixed_media", "photography")) {
    $dir = "$base\assets\images\$cat"
    $htmlPath = "$base\$cat.html"
    $files = Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -match "\.(png|jpg|jpeg|heic)$" }
    
    $items = @()
    foreach ($f in $files) {
        $encoded = [uri]::EscapeUriString($f.Name).Replace("%20", " ")
        $url = "assets/images/$cat/$($f.Name)"
        $items += "        <div class=`"gallery-item`">"
        $items += "            <img src=`"$url`" alt=`"$cat art`" loading=`"lazy`">"
        $items += "        </div>"
    }
    
    $content = Get-Content -Path $htmlPath -Raw
    $pattern = '(?s)(<main class="gallery-container fade-in">).*?(</main>)'
    $replacement = "`$1`n" + ($items -join "`n") + "`n    `$2"
    $newContent = $content -replace $pattern, $replacement
    Set-Content -Path $htmlPath -Value $newContent -Encoding UTF8
}
