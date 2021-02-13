https://memories-jannik.netlify.app/

## Ziel des Projekts

Bei diesem Projekt ging es darum auf Basis eines Youtube-Tutorials (https://www.youtube.com/watch?v=ngc9gnGgUdA&t=5s) meine React Kenntnisse aufzufrischen, einen ersten Einblick in Backend-Entwicklung zu bekommen und dieses neue Wissen dann anzuwenden und das Projekt zu erweitern. Außerdem wollte ich nachdem ich die letzten zwei Jahre viel mit Bulma und Bootstrap gearbeitet habe ein neues CSS-Framework ausprobieren und entschied mich für Material-Ui. An dem Projekt habe ich 5 Wochen mit ca. 10-15 Stunden pro Woche gearbeitet.

## Funktionalität und technische Umsetzung

Der User registriert sich und loggt sich dann ein. Die User werden in einer MongoDB verwaltet und die Authentication wird über JWT (Json-Webtokens) durchgeführt. Sobald ein User sich erfolgreich angemeldet hat, kann er durch einen klick auf den Plus-Button neue Memories/Posts erstellen und bestehende bearbeiten oder löschen. Zu jedem Post gehört ein Bild -dieses wird einmal verkleinert und einmal in der original Größe in einem Google Cloud Storage Bucket gespeichert. In der MongoDB wird daher nur die passende URL gespeichert, was zu schnelleren Ladezeiten im Frontend und weniger Speicherverbrauch im Backend führt.
Der User hat weiterhin die Möglichkeit Posts zu liken/disliken, die Posts nach Title und Tags zu durchsuchen und die Bilder in original Größe zu betrachten.

## Probleme und deren Lösung

Eines der Hauptprobleme bei dem Projekt war das speichern der Bilder in GCS. Alleine um einen Account zu erstellen und einen Access-Key mit den richtigen Rollen im Projekt zu hinterlegen braucht man gefühlt einen Doktortitel. Es wundert mich nicht, dass es mittlerweile Kurse gibt die einem die Benutzung des Dashboards beibringen.

Mein nächstes Problem mit GCS war, dass sowohl GCS wie auch der Browser sämtliche URL's zu den Bildern cachen - d.h selbst wenn der User seinen Post mit einem neueh Bild updated sieht er weiterhin das Alte. Diese Problematik löste ich, indem ich die cache-control der einzelnen Datein im GCS anpasste und indem ich bei jedem create/update Vorgang einen Timestamp an die URL des Bildes hänge um das Caching des Browsers zu verwirren.

## Was habe ich durch das Projekt gelernt?!

Die Benutzung von Material-Ui war nach etwas Einarbeitung sehr elegant und einfach. Die Library bietet ein weites Spektrum an leicht zu benutzenden Komponenten die man sehr gut weiter individualisieren kann. Auch die Mobile-Responsivness funktioniert fast automatisch, an einigen Stellen muss man aber immer etwas ausbessern. Material-Ui überzeugte mich komplett und wird von mir sicher bald wieder verwendet werden.

Das schreiben des Backend Codes funktionierte durch meine Vorkenntnisse in Javascript überraschend gut. Bei der Verarbeitung der Bilder stieß ich teilweise an meine Grenzen und konnte viel dazulernen - wie wandel ich einen Buffer in ein File um und wieder zurück ?!, warum sind alle meine Bilder 90-Grad gedreht ?!

Fullstack ist klasse! Die Möglichkeit zu haben eigene kleine Projekte komplett selbstständig umsetzen zu können und so schnell Ideen ausprobieren zu können motiviert mich und gibt mir die Möglichkeit selbstständiger zu arbeiten!

## Next Steps

* Kommentare
* Videos
* Möglichkeit mehrere Bilder hochzuladen
* Profil-Ansicht
* Anemdlung und Authentication erweitern, Passwort zurücksetzen, Registrierung bestätigen per Link in E-Mail etc.

## Der Stack

- Frontend: React, Redux, Material-Ui
- Backend: Node.js, Express, Sharp, JWT
- Datenbank: MongoDB Cloud Atlas
- Cloud-Storage: Google Cloud Storage
- Hosting: Heroku (BE) + Netlify (FE)
