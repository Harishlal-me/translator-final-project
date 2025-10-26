$ports = @(5000,5002,5003,5004,5005,5006,5007,5008,5009)
foreach ($p in $ports) {
    $res = Test-NetConnection -ComputerName 127.0.0.1 -Port $p -WarningAction SilentlyContinue
    if ($res.TcpTestSucceeded) {
        Write-Output "OPEN $p"
    } else {
        Write-Output "CLOSED $p"
    }
}
