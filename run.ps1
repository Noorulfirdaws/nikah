# Nikah App - Docker Manager
# Usage: .\run.ps1

Write-Host ""
Write-Host "  ================================" -ForegroundColor Green
Write-Host "        NIKAH APP - Docker        " -ForegroundColor Green
Write-Host "    Muslim Marriage Platform      " -ForegroundColor Green
Write-Host "  ================================" -ForegroundColor Green
Write-Host ""
Write-Host "  What do you want to do?" -ForegroundColor White
Write-Host ""
Write-Host "  [1]  Start app          (build + run)" -ForegroundColor Yellow
Write-Host "  [2]  Stop app" -ForegroundColor Yellow
Write-Host "  [3]  Restart app" -ForegroundColor Yellow
Write-Host "  [4]  View live logs" -ForegroundColor Yellow
Write-Host "  [5]  Open in browser    (http://localhost:5175)" -ForegroundColor Yellow
Write-Host "  [6]  Rebuild from scratch" -ForegroundColor Yellow
Write-Host "  [7]  Show container status" -ForegroundColor Yellow
Write-Host "  [Q]  Quit" -ForegroundColor DarkGray
Write-Host ""

$choice = Read-Host "  Enter choice"

switch ($choice.ToUpper()) {

  "1" {
    Write-Host ""
    Write-Host "  Starting Nikah app..." -ForegroundColor Cyan
    docker compose up --build -d
    if ($LASTEXITCODE -eq 0) {
      Write-Host ""
      Write-Host "  App is running at http://localhost:5175" -ForegroundColor Green
      Write-Host ""
      $open = Read-Host "  Open in browser now? (Y/N)"
      if ($open.ToUpper() -eq "Y") {
        Start-Process "http://localhost:5175"
      }
    }
  }

  "2" {
    Write-Host ""
    Write-Host "  Stopping app..." -ForegroundColor Cyan
    docker compose down
    Write-Host "  App stopped." -ForegroundColor Green
  }

  "3" {
    Write-Host ""
    Write-Host "  Restarting app..." -ForegroundColor Cyan
    docker compose restart
    Write-Host "  App restarted at http://localhost:5175" -ForegroundColor Green
  }

  "4" {
    Write-Host ""
    Write-Host "  Showing live logs (Ctrl+C to exit)..." -ForegroundColor Cyan
    docker logs -f nikah-app
  }

  "5" {
    Write-Host ""
    Write-Host "  Opening http://localhost:5175 ..." -ForegroundColor Cyan
    Start-Process "http://localhost:5175"
  }

  "6" {
    Write-Host ""
    Write-Host "  Rebuilding from scratch (no cache)..." -ForegroundColor Cyan
    docker compose down
    docker compose build --no-cache
    docker compose up -d
    Write-Host ""
    Write-Host "  Rebuild complete. App running at http://localhost:5175" -ForegroundColor Green
  }

  "7" {
    Write-Host ""
    docker ps --filter name=nikah-app --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}"
    Write-Host ""
  }

  "Q" {
    Write-Host "  Bye!" -ForegroundColor DarkGray
  }

  default {
    Write-Host "  Invalid choice." -ForegroundColor Red
  }
}

Write-Host ""
