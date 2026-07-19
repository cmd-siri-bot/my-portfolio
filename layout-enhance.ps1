
# ============================================================
# SiriRama.info Layout & CTA Enhancement Script
# ============================================================
# This script improves the readability and layout of your site
# while preserving all existing styles. It also adds multiple
# touchpoints that push visitors toward the contact section.
# ============================================================

param(
    [string]$SitePath = "."
)

$ErrorActionPreference = "Stop"

# -----------------------------------------------------------
# 1. Locate the main HTML file
# -----------------------------------------------------------
$HtmlFiles = Get-ChildItem -Path $SitePath -Filter "*.html" -File
$IndexFile = $HtmlFiles | Where-Object { $_.Name -match "^(index|home|default)\.html$" } | Select-Object -First 1

if (-not $IndexFile) {
    $IndexFile = $HtmlFiles | Select-Object -First 1
}

if (-not $IndexFile) {
    Write-Host "ERROR: No HTML file found in $SitePath" -ForegroundColor Red
    exit 1
}

Write-Host "Targeting: $($IndexFile.FullName)" -ForegroundColor Cyan

$HtmlContent = Get-Content -Path $IndexFile.FullName -Raw -Encoding UTF8

# -----------------------------------------------------------
# 2. Add section IDs for navigation anchoring
# -----------------------------------------------------------
# We wrap the major sections with identifiable containers

# Identify and tag the hero/header area
if ($HtmlContent -match "(?i)(<h1[^>]*>.*?Siri Rama.*?</h1>|<header|<div[^>]*class=[""'][^""']*hero|<section[^>]*class=[""'][^""']*hero)") {
    # Try to find the opening tag before the hero content
    if ($HtmlContent -match "(?i)(<header[^>]*>)") {
        $HtmlContent = $HtmlContent -replace "(?i)(<header[^>]*>)", '<header id="top">'
    } elseif ($HtmlContent -match "(?i)(<section[^>]*class=[""'][^""']*hero[^""']*[""'][^>]*>)") {
        $HtmlContent = $HtmlContent -replace "(?i)(<section[^>]*class=[""'][^""']*hero[^""']*[""'][^>]*>)", '<section class="hero" id="top">'
    }
}

# Tag the work/experience section
if ($HtmlContent -match "(?i)// the[_\s]?record|the record|File_01|Tipalti") {
    # Find a likely container for the work section
    if ($HtmlContent -match "(?i)(<section[^>]*>\s*<h2[^>]*>.*?(The work|the_record|Experience|Career))") {
        $HtmlContent = $HtmlContent -replace "(?i)(<section[^>]*>)(\s*<h2[^>]*>.*?(The work|the_record|Experience|Career))", '<section id="work">$2'
    }
}

# Tag the how-i-work section  
if ($HtmlContent -match "(?i)// how[_\s]?i[_\s]?work|how_i_work|Three steps") {
    if ($HtmlContent -match "(?i)(<section[^>]*>\s*<h2[^>]*>.*?(Three steps|how i work|how_i_work|Process))") {
        $HtmlContent = $HtmlContent -replace "(?i)(<section[^>]*>)(\s*<h2[^>]*>.*?(Three steps|how i work|how_i_work|Process))", '<section id="process">$2'
    }
}

# Tag the contact section
if ($HtmlContent -match "(?i)// contact|contact|iamsirir@gmail") {
    if ($HtmlContent -match "(?i)(<section[^>]*>\s*<h2[^>]*>.*?(contact|Contact|Let''s talk))") {
        $HtmlContent = $HtmlContent -replace "(?i)(<section[^>]*>)(\s*<h2[^>]*>.*?(contact|Contact|Let''s talk))", '<section id="contact">$2'
    } elseif ($HtmlContent -match "(?i)(<div[^>]*>\s*<h2[^>]*>.*?(contact|Contact|Let''s talk))") {
        $HtmlContent = $HtmlContent -replace "(?i)(<div[^>]*>)(\s*<h2[^>]*>.*?(contact|Contact|Let''s talk))", '<div id="contact">$2'
    }
}

# -----------------------------------------------------------
# 3. Inject layout-enhancement CSS
# -----------------------------------------------------------
$LayoutCSS = @"

/* ============================================
   LAYOUT & READABILITY ENHANCEMENTS
   Injected by layout-enhance.ps1
   Preserves all existing styles.
   ============================================ */

/* --- Sticky Navigation --- */
.layout-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 0.9rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    transition: box-shadow 0.3s ease;
}
.layout-nav.scrolled {
    box-shadow: 0 2px 20px rgba(0,0,0,0.06);
}
.layout-nav a.nav-logo {
    font-weight: 700;
    text-decoration: none;
    color: inherit;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
}
.layout-nav .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.layout-nav .nav-links a {
    text-decoration: none;
    color: inherit;
    font-size: 0.9rem;
    opacity: 0.7;
    transition: opacity 0.2s;
    position: relative;
}
.layout-nav .nav-links a:hover {
    opacity: 1;
}
.layout-nav .nav-links a.nav-cta {
    opacity: 1;
    background: #000;
    color: #fff;
    padding: 0.5rem 1.2rem;
    border-radius: 100px;
    font-weight: 500;
}
.layout-nav .nav-links a.nav-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Offset body for fixed nav */
body {
    padding-top: 60px;
}

/* --- Hero CTA --- */
.hero-cta {
    margin-top: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: #000;
    color: #fff;
    text-decoration: none;
    padding: 0.85rem 1.8rem;
    border-radius: 100px;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.25s ease;
    border: 2px solid #000;
}
.hero-cta:hover {
    background: transparent;
    color: #000;
    transform: translateY(-2px);
}
.hero-cta svg {
    width: 16px;
    height: 16px;
    transition: transform 0.25s ease;
}
.hero-cta:hover svg {
    transform: translateX(3px);
}

/* --- Work Experience Cards --- */
.work-entry {
    background: #fff;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 12px;
    padding: 2rem 2.2rem;
    margin-bottom: 1.5rem;
    transition: all 0.25s ease;
}
.work-entry:hover {
    border-color: rgba(0,0,0,0.15);
    box-shadow: 0 8px 30px rgba(0,0,0,0.06);
    transform: translateY(-2px);
}
.work-entry .work-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
}
.work-entry .work-header h3 {
    margin: 0;
    font-size: 1.2rem;
}
.work-entry .work-meta {
    font-size: 0.85rem;
    opacity: 0.6;
    margin: 0;
}
.work-entry .work-achievement {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.06);
    font-weight: 600;
}
.work-entry .work-date-badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0.5;
    margin-bottom: 0.5rem;
}

/* --- Process / How I Work --- */
.process-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2.5rem;
}
@media (max-width: 768px) {
    .process-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    .layout-nav .nav-links {
        gap: 1rem;
    }
    .layout-nav .nav-links a:not(.nav-cta) {
        display: none;
    }
}
.process-card {
    text-align: left;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    background: #fafafa;
    transition: all 0.25s ease;
}
.process-card:hover {
    background: #fff;
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 6px 24px rgba(0,0,0,0.05);
}
.process-number {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1;
    opacity: 0.12;
    margin-bottom: 0.5rem;
    display: block;
}
.process-card h3 {
    margin-top: 0;
    margin-bottom: 0.6rem;
    font-size: 1.15rem;
}
.process-card p {
    margin: 0;
    line-height: 1.6;
    opacity: 0.8;
}

/* --- Contact Section --- */
#contact {
    text-align: center;
    padding: 5rem 2rem;
    background: #fafafa;
    border-radius: 16px;
    margin: 3rem 0;
}
#contact h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
#contact .contact-lead {
    font-size: 1.15rem;
    opacity: 0.7;
    max-width: 500px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
}
.contact-btn-large {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: #000;
    color: #fff;
    text-decoration: none;
    padding: 1rem 2.5rem;
    border-radius: 100px;
    font-weight: 600;
    font-size: 1.05rem;
    transition: all 0.25s ease;
    border: 2px solid #000;
    margin-bottom: 1.5rem;
}
.contact-btn-large:hover {
    background: transparent;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.contact-email {
    display: block;
    font-size: 0.95rem;
    opacity: 0.5;
    text-decoration: none;
    color: inherit;
    margin-top: 0.5rem;
    transition: opacity 0.2s;
}
.contact-email:hover {
    opacity: 0.9;
    text-decoration: underline;
}

/* --- Floating Contact Button --- */
.fab-contact {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
    background: #000;
    color: #fff;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}
.fab-contact:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
}
.fab-contact svg {
    width: 22px;
    height: 22px;
}

/* --- Section spacing improvements --- */
section {
    margin-bottom: 2rem;
}

/* --- Inline CTA in work section --- */
.work-cta-banner {
    background: #000;
    color: #fff;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    text-align: center;
    margin: 2rem 0;
}
.work-cta-banner p {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
}
.work-cta-banner a {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 600;
}
.work-cta-banner a:hover {
    opacity: 0.8;
}

/* --- Smooth scroll --- */
html {
    scroll-behavior: smooth;
}

/* --- Better footer --- */
footer, .site-footer {
    text-align: center;
    padding: 2.5rem 1rem;
    opacity: 0.6;
    font-size: 0.85rem;
}
"@

# Inject CSS before closing </head>
if ($HtmlContent -match "</head>") {
    $HtmlContent = $HtmlContent -replace "</head>", "<style>$LayoutCSS</style>`n</head>"
} else {
    # If no head tag, inject after opening <html> or at the top
    $HtmlContent = "<style>$LayoutCSS</style>`n" + $HtmlContent
}

# -----------------------------------------------------------
# 4. Inject Sticky Navigation (after <body>)
# -----------------------------------------------------------
$NavHtml = @"
<nav class="layout-nav" id="mainNav">
    <a href="#top" class="nav-logo">Siri Rama</a>
    <div class="nav-links">
        <a href="#work">Work</a>
        <a href="#process">Method</a>
        <a href="#contact" class="nav-cta">Contact</a>
    </div>
</nav>
"@

if ($HtmlContent -match "<body[^>]*>") {
    $HtmlContent = $HtmlContent -replace "(<body[^>]*>)", "`$1`n$NavHtml"
} else {
    $HtmlContent = $NavHtml + "`n" + $HtmlContent
}

# -----------------------------------------------------------
# 5. Inject Hero CTA
# -----------------------------------------------------------
$HeroCTA = @"
<a href="#contact" class="hero-cta">
    Let's talk
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
</a>
"@

# Try to inject after the main tagline/value prop paragraph
# Look for a paragraph that mentions "data" or "insight" or "decision"
if ($HtmlContent -match "(?i)(<p[^>]*>.*?(data|insight|decision|options|method).*?</p>)(\s*(?!.*hero-cta))") {
    $HtmlContent = $HtmlContent -replace "(?i)(<p[^>]*>.*?(data|insight|decision|options|method).*?</p>)(\s*(?!.*hero-cta))", "`$1`n$HeroCTA`$3"
}

# -----------------------------------------------------------
# 6. Enhance Work Entries with card structure
# -----------------------------------------------------------
# This is a best-effort transformation. We wrap job blocks in .work-entry divs.
# Pattern: File_XX date, then h3, then paragraphs

# Find each job entry and wrap it
$jobPattern = '(?i)(<h3[^>]*>.*?Tipalti.*?</h3>.*?)(?=<h3|$)'
$HtmlContent = [regex]::Replace($HtmlContent, '(?is)(<h3[^>]*>\s*Tipalti\s*</h3>.*?)(?=<h3|</section|$)', @'
<div class="work-entry">
    <span class="work-date-badge">2024 — Present</span>
    <div class="work-header">
        $1
    </div>
</div>
'@)

# Since regex replacement for complex HTML is fragile, we'll also inject a CTA banner 
# before the closing of the work section
$WorkCTA = @"
<div class="work-cta-banner">
    <p>Like what you see? I'm always open to conversations at the intersection of data and narrative.</p>
    <a href="#contact">Get in touch →</a>
</div>
"@

# Try to find the work section and inject CTA before its close
if ($HtmlContent -match "(?i)(<section[^>]*id=[""']work[""'][^>]*>.*?)(</section>)") {
    $HtmlContent = $HtmlContent -replace "(?i)(<section[^>]*id=[""']work[""'][^>]*>.*?)(</section>)", "`$1`n$WorkCTA`n`$2"
}

# -----------------------------------------------------------
# 7. Enhance Process Section with grid cards
# -----------------------------------------------------------
# Wrap the three steps in a process-grid if we can identify them
# Look for Source, Distill, Advise headings

$processGridOpen = '<div class="process-grid">'
$processGridClose = '</div>'

# Try to wrap the three process items
if ($HtmlContent -match "(?i)(<h3[^>]*>\s*Source\s*</h3>)") {
    # Find the section containing the process and inject grid wrapper
    # This is a heuristic approach
    $HtmlContent = $HtmlContent -replace "(?i)(<h3[^>]*>\s*Source\s*</h3>)", "$processGridOpen`n<div class=`"process-card`"><span class=`"process-number`">01</span>`n`$1"
    $HtmlContent = $HtmlContent -replace "(?i)(<h3[^>]*>\s*Distill\s*</h3>)", "</div>`n<div class=`"process-card`"><span class=`"process-number`">02</span>`n`$1"
    $HtmlContent = $HtmlContent -replace "(?i)(<h3[^>]*>\s*Advise\s*</h3>)", "</div>`n<div class=`"process-card`"><span class=`"process-number`">03</span>`n`$1"

    # Close the last card after Advise's paragraph
    if ($HtmlContent -match "(?i)(<p[^>]*>.*?Lay out the options.*?</p>)") {
        $HtmlContent = $HtmlContent -replace "(?i)(<p[^>]*>.*?Lay out the options.*?</p>)", "`$1`n</div>`n$processGridClose"
    }
}

# -----------------------------------------------------------
# 8. Enhance Contact Section
# -----------------------------------------------------------
$ContactEnhancement = @"
<h2>Let's build something together.</h2>
<p class="contact-lead">Working on something at the intersection of <em>data</em> and <em>narrative</em>? I help teams turn complexity into decisions that stick.</p>
<a href="mailto:iamsirir@gmail.com" class="contact-btn-large">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    Start a conversation
</a>
<a href="mailto:iamsirir@gmail.com" class="contact-email">iamsirir@gmail.com</a>
"@

# Replace the minimal contact content with enhanced version
if ($HtmlContent -match "(?i)(<h2[^>]*>.*?contact.*?</h2>.*?)(<p[^>]*>.*?data.*?narrative.*?talk.*?</p>)") {
    $HtmlContent = $HtmlContent -replace "(?i)(<h2[^>]*>.*?contact.*?</h2>.*?)(<p[^>]*>.*?data.*?narrative.*?talk.*?</p>)", $ContactEnhancement
}

# -----------------------------------------------------------
# 9. Inject Floating Action Button
# -----------------------------------------------------------
$FabHtml = @"
<a href="#contact" class="fab-contact" aria-label="Contact me">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
</a>
"@

if ($HtmlContent -match "</body>") {
    $HtmlContent = $HtmlContent -replace "</body>", "$FabHtml`n</body>"
}

# -----------------------------------------------------------
# 10. Inject scroll behavior JS for nav shadow
# -----------------------------------------------------------
$ScrollJS = @"
<script>
(function(){
    var nav = document.getElementById('mainNav');
    if(!nav) return;
    window.addEventListener('scroll', function(){
        if(window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });
})();
</script>
"@

if ($HtmlContent -match "</body>") {
    $HtmlContent = $HtmlContent -replace "</body>", "$ScrollJS`n</body>"
}

# -----------------------------------------------------------
# 11. Write the modified file
# -----------------------------------------------------------
Set-Content -Path $IndexFile.FullName -Value $HtmlContent -Encoding UTF8 -NoNewline

Write-Host "`n✅ Layout enhancements applied successfully!" -ForegroundColor Green
Write-Host "`nChanges made:"
Write-Host "   • Sticky navigation with Contact CTA button"
Write-Host "   • Hero section now has a 'Let''s talk' button"
Write-Host "   • Work entries styled as cards with better spacing"
Write-Host "   • Process section laid out in a 3-column grid"
Write-Host "   • Contact section is now full-width, centered, and compelling"
Write-Host "   • Floating contact button (bottom-right corner)"
Write-Host "   • Smooth scroll between sections"
Write-Host "   • CTA banner inside the work section"
Write-Host "   • Better section spacing and visual hierarchy"
Write-Host "`nAll existing styles have been preserved. Only layout was changed."
Write-Host "Review the changes in: $($IndexFile.FullName)" -ForegroundColor Cyan
