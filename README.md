
# Smart Parking - מערכת ניהול חניון חכם

מערכת לניהול חניון חכם המבוססת על Docker ו-Docker Compose.

המערכת מאפשרת לשומר בחניון לצפות בלוח בקרה המציג תמונות של רכבים הנכנסים לחניון.

## ארכיטקטורת המערכת

הפרויקט מבוסס על שני שירותים:

- **Nginx:** אחראי על הצגת לוח הבקרה ומשמש גם כ-Reverse Proxy.
- **Apache:** אחראי על אחסון והנגשת תמונות הרכבים.

שרת Nginx מתקשר עם שרת Apache באמצעות רשת פנימית של Docker.

## טכנולוגיות וכלים

- Linux
- Docker
- Docker Compose
- Docker Volumes
- Nginx
- Apache HTTP Server
- HTML5
- CSS3
- JavaScript
- Git ו-GitHub
- GitHub Actions

## מבנה הפרויקט

```text
smart-parking/
├── .github/
│   └── workflows/
│       └── docker-build.yml
├── nginx/
│   ├── Dockerfile
│   ├── default.conf
│   ├── index.html
│   ├── script.js
│   └── style.css
├── storage/
│   ├── Dockerfile
│   ├── apache.conf
│   └── images/
├── compose.yml
├── README.md
└── AI_USAGE.txt
```

## התקנה והרצת הפרויקט

### דרישות מקדימות

- Docker
- Docker Compose

### שכפול המאגר

```bash
git clone https://github.com/itaymadar/project_parking.git
cd project_parking
```

### בניית השירותים

```bash
docker compose build
```

### הפעלת המערכת

```bash
docker compose up -d
```

לאחר הפעלת המערכת ניתן להיכנס ללוח הבקרה דרך:

http://localhost:8080

### עצירת המערכת

```bash
docker compose down
```

## שמירת נתונים באמצעות Docker Volume

הפרויקט משתמש ב-Named Volume בשם `parking-images-live`.

ה-Volume מחובר באמצעות Bind Mount לתיקייה המקומית:

`storage/images`

כך שרת Apache יכול לגשת לתמונות שנמצאות בתיקייה המקומית.

התמונות נשארות זמינות גם לאחר עצירת ה-Containers והפעלתם מחדש.

## פיצ'ר ייחודי - הצגת תמונות דינמית

המערכת כוללת מנגנון להצגה אוטומטית של תמונות רכבים בדשבורד.

באמצעות JavaScript מתבצעת בדיקה מול שרת Apache כל 3 שניות.

התמונות שנמצאות בתיקיית `storage/images` מוצגות באתר באופן דינמי.

ניתן להוסיף או למחוק תמונות מהתיקייה והאתר יתעדכן אוטומטית ללא צורך בעריכת קובץ HTML או בבנייה מחדש של ה-Containers.

## CI/CD - GitHub Actions

הפרויקט כולל תהליך CI באמצעות GitHub Actions.

בכל Push למאגר מתבצעת בנייה של שירותי Docker כדי לבדוק שניתן לבנות את התמונות בהצלחה.

קובץ ה-Workflow נמצא בנתיב:

`.github/workflows/docker-build.yml`

## היקף הפרויקט

הפרויקט מבוסס על Track 1 - Lite.

מטרתו להדגים שימוש ב-Docker, ניהול שירותים באמצעות Docker Compose, תקשורת בין שירותים, שמירת נתונים באמצעות Volumes ואוטומציה של תהליך בניית Docker באמצעות GitHub Actions.

המערכת מציגה נתוני הדגמה ותמונות רכבים. היא אינה כוללת שרת Backend, ממשק API או זיהוי אוטומטי של לוחיות רישוי.

## צוות הפרויקט

הפרויקט פותח במסגרת עבודת צוות בנושא DevOps ו-Docker.
