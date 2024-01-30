function Get-StravaStats {
    param (
        [string]$accessToken,
        [string]$athleteId
    )

    $url = "https://www.strava.com/api/v3/athletes/${athleteId}/stats"
    $response = Invoke-WebRequest -Uri $url -Method Get -Headers @{
        'accept'        = 'application/json'
        'authorization' = "Bearer $accessToken"
    }

    return $response.Content | ConvertFrom-Json
}


$results = @()
$users =@('Jappe', 'Tommy', 'Douti','Rob', 'Jury Sam', 'Jacky','Brony', 'Ja')
$athleteIds = @(13267698, 52897379, 25769304, 4322971,12985924,45713278,20170440,52693909)
$refreshtokens = @('74505db489e9eacae8c8d42316023557874b93b8','05c5abe6c21e6fe27d1d9fbca7571f87cfadc772','d128ed8b4250cef72205dacf86463e91ec595d23','4f0e73b6997b729e29b170137a8edcd8c4231cb4','331dbbdb23b60afdf0888e4348a4aea921dfdbd4','2f4823841a2671d6b14b3c93e38ffc5c20590201','b6191f70da0a1c0dde15da7f49137cc3d456f309','6625e3d89c039e7f92a7dcc6417c637e116a6356')
#1 use refresh token to get new acces_token
for(i=0; i<$users.count;i++){ #right for loop
$refreshtoken = $refreshtokens[i]
    $url = "https://www.strava.com/oauth/token?client_id=118287&client_secret=9cf001c29054c0e12d8b0a14333409b39ad5372e&refresh_token=${refreshtoken}&grant_type=refresh_token"
    $response = Invoke-WebRequest -Uri $url -Method Post #headers needed?

    #get accesstoken from response $accessToken
    #get athleteId by index $athleteId
    $stravaStats = Get-StravaStats -accessToken $accessToken -athleteId $athleteIds[i]
    $ytdSwimTotals = $stravaStats.ytd_swim_totals.distance /1000
    $ytdRideTotals = $stravaStats.ytd_ride_totals.distance / 10000
    $ytdRunTotals = $stravaStats.ytd_run_totals.distance / 1000
    $resultArray = @($ytdSwimTotals, $ytdRideTotals, $ytdRunTotals)
$results += "["+($resultArray -join ', ')+"]"


#todo append to create this result
const participants = [
 
  { name: $users[i], values: $results }, 
  { name: 'Tommy', values: [0, 0, 223.821]},
  { name: 'Douti', values: [12, 4.0444, 125.643]},
  { name: 'Rob', values:[0, 0, 176.574]},
  { name: 'Jacky', values: [0, 0, 110.651]},
  { name: 'Bronny', values: [0, 0, 225.738] },
  { name: 'Ja', values: [0, 0, 100.395] },
  { name: 'Jury Sam', values:[0, 0, 14.678] },
];

}

