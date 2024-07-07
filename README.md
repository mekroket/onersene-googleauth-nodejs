# Önersene Google Auth Node.js Projesi

## Proje Amacı
Bu proje, Node.js ve Express.js kullanarak Google Authentication (Google Auth) ile kimlik doğrulama ve yönlendirme işlemlerini gerçekleştiren bir uygulamadır. Proje ayrıca Google veri setlerini kullanmayı, yönetici ve admin rollerini ayırmayı ve kullanıcı arayüzü geliştirmeyi amaçlar.

## Proje Resimleri
![1](https://github.com/mekroket/onersene-googleauth-nodejs/blob/main/1.png)
![2](https://github.com/mekroket/onersene-googleauth-nodejs/blob/main/2.png)
![3](https://github.com/mekroket/onersene-googleauth-nodejs/blob/main/3.png)
![4](https://github.com/mekroket/onersene-googleauth-nodejs/blob/main/4.png)

## Kullanılan Teknolojiler
- **Node.js**: Sunucu taraflı JavaScript çalıştırma ortamı.
- **Express.js**: Node.js için minimal ve esnek web uygulama çatısı.
- **MongoDB**: NoSQL veritabanı yönetim sistemi.
- **Google Auth**: Google'ın OAuth 2.0 protokolünü kullanarak kullanıcı kimlik doğrulama.
- Node.js
- MongoDB
  
## Özellikler
Google ile kimlik doğrulama
Kullanıcı ve yönetici rolleri
Yönetici paneli
Google veri setlerini kullanma
Kullanıcı arayüzü geliştirme
Katkıda Bulunma
Katkıda bulunmak için lütfen bir çekme isteği (pull request) gönderin veya bir sorun (issue) açın.

### Gereksinimler
Gerekli bağımlılıkları yükleyin:


```bash
npm install bcryptjs@^2.4.3 connect-flash@^0.1.1 dotenv@^16.3.1 ejs@^3.1.9 express@^4.18.2 express-ejs-layouts@^2.5.1 express-flash@^0.0.2 express-session@^1.17.3 intl-tel-input@^18.2.1 mongoose@^7.5.4 multer@^1.4.5-lts.1 passport@^0.6.0 passport-google-oauth@^2.0.0 passport-google-oauth2@^0.2.0 passport-local@^1.0.0 twilio@^4.18.1
```

### Ortam değişkenlerini ayarlayın:
Projenin kök dizininde bir .env dosyası oluşturun ve aşağıdaki bilgileri ekleyin:
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
```

İyi Çalışmalar.


