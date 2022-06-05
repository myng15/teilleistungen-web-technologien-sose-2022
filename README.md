## Test-Browser
Der Webauftritt wurde in Mozilla Firefox und Google Chrome getestet.

## Besonderheiten
**Error-Handling**: Beim aktuell beibehaltenen Error-Handling für die API-Requests konnte ich nicht immer verifizieren, dass die Fehlermeldung in der Konsole bzw. an der gewünschten Stelle auf der Webseite angezeigt wird. Ein Grund dafür könnte sein, dass ich eine bestimmte Errorsituation, z.B. den Fall, dass die angefragte Route nicht zur Verfügung steht, noch nicht richtig simuliert habe. Ich habe als Simulation eines Fehlerfalls beispielsweise die falschen API-URLs manuell im Code angegeben, wobei ich einen 404 Fehlercode bekommen habe, meine Fehlerbehandlung jedoch anscheinend nicht darauf reagiert hat. Die Fehlermeldung war in Ordnung angezeigt worden, als ich z.B. beim folgenden Errorhandling direkt auf die Status-Codes eingegangen war:

if(response.status >=200 && response.status < 300) { //success \ 
    const responseData = await response.json();\
    this.tagData = responseData.content;\
} else { //error \
    console.log(response.status, response.statusText);\
    this.tagData = ["No category found"]; 
}

Ich behalte dennoch das aktuelle Errorhandling bei, weil es nicht immer einen Statuscode gibt. Das aktuelle Errorhandling ist allgemeiner und funktioniert in Ordnung u.a. im Falle, dass die angeforderten Artikeln nicht zur Verfügung stehen. 

  

