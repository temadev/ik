var mongoose = require('lib/mongoose');
mongoose.set('debug', true);
var async = require('async');

async.series([
  open,
  dropDatabase,
  requireModels,
  createUsers,
  createSections,
  createProducts
], function (err) {
  console.log(arguments);
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function requireModels(callback) {
  require('models/User');
  require('models/Section');
  require('models/Product');

  async.each(Object.keys(mongoose.models), function (modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {
  var users = [
    {email: 'artem.kashin@gmail.com', username: 'temakashin', password: '111', role: 'admin' },
    {email: 'kenny@gmail.com', username: 'Kenny', password: '123'},
    {email: 'john@gmail.com', username: 'John', password: '456'},
    {email: 'henry@gmail.com', username: 'Henry', password: '789'}
  ];

  async.each(users, function (userData, callback) {
    var user = new mongoose.models.User(userData);
    user.save(callback);
  }, callback);
}

function createSections(callback) {
  var sections = [
    { title: 'Декоративно-прикладное искусство', url: 'dekorativno-prikladnoe-iskusstvo', description: '' },
    { title: 'Духовно-нравственное воспитание', url: 'duhovno-nravstvennoe-vospitanie', description: '' },
    { title: 'Здоровье', url: 'zdorovie', description: '' },
    { title: 'Иностранные языки', url: 'inostrannye-jazyki', description: '' },
    { title: 'Конкурсы рисунков', url: 'konkursy-risunkov', description: '' },
    { title: 'Краеведение', url: 'kraevedenie', description: '' },
    { title: 'Междисциплинарные проекты', url: 'mezhdisciplinarnye-proekty', description: '' },
    { title: 'Методические разработки', url: 'metodicheskie-razrabotki', description: '' },
    { title: 'Общественные инициативы', url: 'obshhestvennye-iniciativy', description: '' },
    { title: 'ОВЗ', url: 'ovz', description: '' },
    { title: 'Патриотическое воспитание', url: 'patrioticheskoe-vospitanie', description: '' },
    { title: 'Программы и мероприятия', url: 'programmy-i-meroprijatija', description: '' },
    { title: 'Профессиональное ориентирование', url: 'professionalnoe-orientirovanie', description: '' },
    { title: 'Русский язык и литература', url: 'russkij-jazyk-i-literatura', description: '' },
    { title: 'Творческое воспитание', url: 'tvorcheskoe-vospitanie', description: '' },
    { title: 'Физическая культура и спорт', url: 'fizicheskaja-kultura-i-sport', description: '' },
    { title: 'Фотоконкурс', url: 'fotokonkurs', description: '' },
    { title: 'Экология', url: 'ekologija', description: '' }
  ];

  async.each(sections, function (sectionData, callback) {
    var section = new mongoose.models.Section(sectionData);
    section.save(callback);
  }, callback);
}

function createProducts(callback) {
  mongoose.models.Section.find({}, function (err, sections) {
    var products = [
      { title: 'Конкурс декоративно-прикладного искусства «Весенняя капель»', url: 'konkurs-dekorativno-prikladnogo-iskusstva-vesennjaja-kapel', price: '', sections: sections[0], start: '01.03.14', end: '31.05.14' },
      { title: 'Конкурс декоративно-прикладного искусства «Зимушка-красавица!»', url: 'konkurs-dekorativno-prikladnogo-iskusstva-zimushka-krasavica!', price: '330', sections: sections[0], start: '01.12.13', end: '01.03.14' },
      { title: 'Конкурс декоративно-прикладного искусства «Летнее вдохновение»', url: 'konkurs-dekorativno-prikladnogo-iskusstva-letnee-vdohnovenie', price: '', sections: sections[0] , start: '', end: ''},
      { title: 'Конкурс декоративно-прикладного искусства «Осенний калейдоскоп»', url: 'konkurs-dekorativno-prikladnogo-iskusstva-osennij-kalejdoskop', price: '', sections: sections[0] , start: '', end: ''},
      { title: 'Конкурс декоративно-прикладного искусства «Народы России: культура и традиции»', url: 'konkurs-dekorativno-prikladnogo-iskusstva-narody-rossii-kultura-i-tradicii', price: '440', sections: sections[0], start: '01.01.14', end: '01.03.14' },
      { title: 'Исследовательский конкурс «Религиозная культура на Руси. Традиции и современность»', url: 'issledovatelskij-konkurs-religioznaja-kultura-na-rusi-tradicii-i-sovremennost', price: '440', sections: sections[1], start: '01.01.14', end: '01.03.14' },
      { title: 'Исследовательский конкурс «Россия православная. Традиции и современность»', url: 'issledovatelskij-konkurs-rossija-pravoslavnaja-tradicii-i-sovremennost', price: '', sections: sections[1] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Весенний русский народный и православный календарь»', url: 'issledovatelskij-konkurs-vesennij-russkij-narodnyj-i-pravoslavnyj-kalendar', price: '', sections: sections[1], start: '01.03.14', end: '31.05.14' },
      { title: 'Исследовательский конкурс «Зимний народный и православный календарь»', url: 'issledovatelskij-konkurs-zimnij-narodnyj-i-pravoslavnyj-kalendar', price: '440', sections: sections[1], start: '01.01.14', end: '01.03.14' },
      { title: 'Исследовательский конкурс «Летний русский народный и православный календарь»', url: 'issledovatelskij-konkurs-letnij-russkij-narodnyj-i-pravoslavnyj-kalendar', price: '', sections: sections[1] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Русские пословицы и поговорки как отражение национального характера, души и мировоззрения»', url: 'issledovatelskij-konkurs-russkie-poslovicy-i-pogovorki-kak-otrazhenie-nacionalnogo-haraktera-dushi-i-mirovozzrenija', price: '440', sections: sections[1], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс на лучшую методическую разработку в области духовно-нравственного воспитания', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-duhovno-nravstvennogo-vospitanija', price: '525', sections: [sections[1], sections[7]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс на лучший сценарий мероприятия духовно-нравственной направленности', url: 'konkurs-na-luchshij-scenarij-meroprijatija-duhovno-nravstvennoj-napravlennosti', price: '525', sections: [sections[1], sections[11]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс на лучший образовательный проект по здоровьеформирующей и здоровьесберегающей деятельности', url: 'konkurs-na-luchshij-obrazovatelnyj-proekt-po-zdoroveformirujushhej-i-zdorovesberegajushhej-dejatelnosti', price: '', sections: sections[2] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ в области здоровьеформирующих и здоровьесберегающих технологий', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-v-oblasti-zdoroveformirujushhih-i-zdorovesberegajushhih-tehnologij', price: '', sections: [sections[2], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку по здоровьеформирующей и здоровьесберегающей деятельности', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-po-zdoroveformirujushhej-i-zdorovesberegajushhej-dejatelnosti', price: '', sections: [sections[2], sections[7]] , start: '', end: ''},
      { title: 'Конкурс общественных инициатив в области здоровьеформирующих и здоровьесберегающих технологий', url: 'konkurs-obshhestvennyh-iniciativ-v-oblasti-zdoroveformirujushhih-i-zdorovesberegajushhih-tehnologij', price: '', sections: [sections[2], sections[8]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области иностранных языков и литературы', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-inostrannyh-jazykov-i-literatury', price: '535', sections: [sections[3], sections[7]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс детских мероприятий и игровых программ «Изучаем языки»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-izuchaem-jazyki', price: '360', sections: [sections[3], sections[11]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс рисунков «Весенняя капель» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-risunkov-vesennjaja-kapel-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[4], start: '01.03.14', end: '31.05.14' },
      { title: 'Конкурс рисунков «В первый раз в первый класс»', url: 'konkurs-risunkov-v-pervyj-raz-v-pervyj-klass', price: '', sections: sections[4] , start: '', end: ''},
      { title: 'Конкурс рисунков «Зимушка-красавица!» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-risunkov-zimushka-krasavica!-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '330', sections: sections[4], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс рисунков «Летнее вдохновение» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-risunkov-letnee-vdohnovenie-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[4] , start: '', end: ''},
      { title: 'Конкурс рисунков «Осенний калейдоскоп» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-risunkov-osennij-kalejdoskop-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[4] , start: '', end: ''},
      { title: 'Конкурс рисунков «Детские улыбки»', url: 'konkurs-risunkov-detskie-ulybki', price: '', sections: sections[4] , start: '', end: ''},
      { title: 'Конкурс рисунков «Иностранный язык в картинках»', url: 'konkurs-risunkov-inostrannyj-jazyk-v-kartinkah', price: '360', sections: [sections[4], sections[3]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс рисунков «Народы России: культура и традиции»', url: 'konkurs-risunkov-narody-rossii-kultura-i-tradicii', price: '330', sections: [sections[4], sections[10]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс рисунков «Великая страна»', url: 'konkurs-risunkov-velikaja-strana', price: '', sections: [sections[4], sections[10]] , start: '', end: ''},
      { title: 'Конкурс рисунков «Русские пословицы и поговорки в картинках»', url: 'konkurs-risunkov-russkie-poslovicy-i-pogovorki-v-kartinkah', price: '340', sections: [sections[4], sections[13]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс рисунков «Родной язык в картинках»', url: 'konkurs-risunkov-rodnoj-jazyk-v-kartinkah', price: '340', sections: [sections[4], sections[13]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс рисунков «Я рисую алфавит»', url: 'konkurs-risunkov-ja-risuju-alfavit', price: '340', sections: [sections[4], sections[13]], start: '15.01.14', end: '15.03.14' },
      { title: 'Исследовательский конкурс «Родной край: культура и традиции»', url: 'issledovatelskij-konkurs-rodnoj-kraj-kultura-i-tradicii', price: '', sections: sections[5] , start: '', end: ''},
      { title: 'Историко-краеведческий конкурс «Дорога, которую я выбираю»', url: 'istoriko-kraevedcheskij-konkurs-doroga-kotoruju-ja-vybiraju', price: '440', sections: sections[5], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс междисциплинарных проектов и программ «Люблю тебя, мой дивный город!»', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-ljublju-tebja-moj-divnyj-gorod!', price: '', sections: [sections[5], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области краеведения «С чего начинается Родина...»', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-kraevedenija-s-chego-nachinaetsja-rodina', price: '525', sections: [sections[5], sections[7]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс детских мероприятий и игровых программ «Люблю тебя, мой дивный город!»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-ljublju-tebja-moj-divnyj-gorod!', price: '', sections: [sections[5], sections[11]] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Родной край: культура и традиции»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-rodnoj-kraj-kultura-i-tradicii', price: '', sections: [sections[5], sections[11]] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ для дошкольных образовательных учреждений', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-dlja-doshkolnyh-obrazovatelnyh-uchrezhdenij', price: '535', sections: sections[6], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс на лучшую методическую разработку для дошкольных образовательных учреждений', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-dlja-doshkolnyh-obrazovatelnyh-uchrezhdenij', price: '535', sections: sections[7], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс общественных инициатив для дошкольных образовательных учреждений', url: 'konkurs-obshhestvennyh-iniciativ-dlja-doshkolnyh-obrazovatelnyh-uchrezhdenij', price: '535', sections: sections[8] , start: '', end: ''},
      { title: 'Конкурс социальных проектов и психолого-педагогических инициатив «Возлюби ближнего своего...» (Формирование толерантности у детей/юношества к людям с ОВЗ)', url: 'konkurs-socialnyh-proektov-i-psihologo-pedagogicheskih-iniciativ-vozljubi-blizhnego-svoego-formirovanie-tolerantnosti-u-detej/junoshestva-k-ljudjam-s-ovz', price: '', sections: sections[9] , start: '', end: ''},
      { title: 'Конкурс социальных проектов и психолого-педагогических инициатив (Социальная адаптация детей с ОВЗ: проблемы, способы и пути интеграции в среду)', url: 'konkurs-socialnyh-proektov-i-psihologo-pedagogicheskih-iniciativ-socialnaja-adaptacija-detej-s-ovz-problemy-sposoby-i-puti-integracii-v-sredu', price: '', sections: sections[9] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Социальная адаптация детей с ОВЗ»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-socialnaja-adaptacija-detej-s-ovz', price: '', sections: [sections[9], sections[11]], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс портфолио для детей с ОВЗ', url: 'konkurs-portfolio-dlja-detej-s-ovz', price: '', sections: [sections[9], sections[14]] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Моя родина: культура и традиции»', url: 'issledovatelskij-konkurs-moja-rodina-kultura-i-tradicii', price: '440', sections: sections[10] , start: '', end: ''},
      { title: 'Конкурс на лучший молодежный проект по патриотическому воспитанию', url: 'konkurs-na-luchshij-molodezhnyj-proekt-po-patrioticheskomu-vospitaniju', price: '', sections: sections[10] , start: '', end: ''},
      { title: 'Конкурс на лучший образовательный проект по патриотическому воспитанию', url: 'konkurs-na-luchshij-obrazovatelnyj-proekt-po-patrioticheskomu-vospitaniju', price: '', sections: sections[10] , start: '', end: ''},
      { title: 'Творческий конкурс «Народы России: песни и танцы»', url: 'tvorcheskij-konkurs-narody-rossii-pesni-i-tancy', price: '360', sections: sections[10], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс на лучшую научно-популярную статью по патриотическому воспитанию «Великая страна»', url: 'konkurs-na-luchshuju-nauchno-populjarnuju-statju-po-patrioticheskomu-vospitaniju-velikaja-strana', price: '', sections: sections[10] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ в области гражданско-правового и патриотического воспитания', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-v-oblasti-grazhdansko-pravovogo-i-patrioticheskogo-vospitanija', price: '', sections: [sections[10], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку по патриотическому воспитанию', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-po-patrioticheskomu-vospitaniju', price: '', sections: [sections[10], sections[7]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс общественных инициатив по патриотическому воспитанию школьников', url: 'konkurs-obshhestvennyh-iniciativ-po-patrioticheskomu-vospitaniju-shkolnikov', price: '', sections: [sections[10], sections[8]] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Моя родина: культура и традиции»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-moja-rodina-kultura-i-tradicii', price: '330', sections: [sections[10], sections[11]] , start: '', end: ''},
      { title: 'Конкурс выпускных мероприятий и программ в дошкольных образовательных учреждениях', url: 'konkurs-vypusknyh-meroprijatij-i-programm-v-doshkolnyh-obrazovatelnyh-uchrezhdenijah', price: '330', sections: sections[11] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ в дошкольных образовательных учреждениях', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-v-doshkolnyh-obrazovatelnyh-uchrezhdenijah', price: '330', sections: sections[11] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ проведенных совместно с родителями в дошкольных образовательных учреждениях «Дружная семья»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-provedennyh-sovmestno-s-roditeljami-v-doshkolnyh-obrazovatelnyh-uchrezhdenijah-druzhnaja-semja', price: '330', sections: sections[11], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс детских мероприятий и игровых программ «Осенний калейдоскоп»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-osennij-kalejdoskop', price: '', sections: sections[11], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс детских мероприятий и игровых программ «День космонавтики»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-den-kosmonavtiki', price: '', sections: sections[11], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс детских мероприятий и игровых программ посвященный Дню Матери «Моя мама»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-posvjashhennyj-dnju-materi-moja-mama', price: '', sections: sections[11], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс детских мероприятий и игровых программ «Весенняя капель»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-vesennjaja-kapel', price: '', sections: sections[11] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Летнее вдохновение»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-letnee-vdohnovenie', price: '', sections: sections[11] , start: '', end: ''},
      { title: 'Конкурс на лучший молодежный проект по профориентации', url: 'konkurs-na-luchshij-molodezhnyj-proekt-po-proforientacii', price: '', sections: sections[12] , start: '', end: ''},
      { title: 'Конкурс социальных проектов и психолого-педагогических инициатив по профориентации', url: 'konkurs-socialnyh-proektov-i-psihologo-pedagogicheskih-iniciativ-po-proforientacii', price: '', sections: sections[12] , start: '', end: ''},
      { title: 'Творческий конкурс по профориентации «Кем я хочу стать»', url: 'tvorcheskij-konkurs-po-proforientacii-kem-ja-hochu-stat', price: '', sections: sections[12] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ по профориентации', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-po-proforientacii', price: '', sections: [sections[12], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку по профессиональному ориентированию', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-po-professionalnomu-orientirovaniju', price: '', sections: [sections[12], sections[7]] , start: '', end: ''},
      { title: 'Конкурс общественных инициатив по профориентации', url: 'konkurs-obshhestvennyh-iniciativ-po-proforientacii', price: '', sections: [sections[12], sections[8]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку по профессиональному ориентированию для детей/юношества с ОВЗ', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-po-professionalnomu-orientirovaniju-dlja-detej/junoshestva-s-ovz', price: '', sections: [sections[12], sections[9], sections[7]] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Кем я хочу стать»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-kem-ja-hochu-stat', price: '', sections: [sections[12], sections[11]] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Будущее русского языка»', url: 'issledovatelskij-konkurs-budushhee-russkogo-jazyka', price: '440', sections: sections[13] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Истоки родного слова»', url: 'issledovatelskij-konkurs-istoki-rodnogo-slova', price: '330', sections: sections[13] , start: '', end: ''},
      { title: 'Конкурс сочинений «Весенняя капель»', url: 'konkurs-sochinenij-vesennjaja-kapel', price: '', sections: sections[13] , start: '', end: ''},
      { title: 'Литературный конкурс «И все засмеялись» (смешные не выдуманные истории из школьной жизни)', url: 'literaturnyj-konkurs-i-vse-zasmejalis-smeshnye-ne-vydumannye-istorii-iz-shkolnoj-zhizni', price: '', sections: sections[13], start: '15.01.14', end: '15.03.14' },
      { title: 'Литературный конкурс «Мой любимый детский сад»', url: 'literaturnyj-konkurs-moj-ljubimyj-detskij-sad', price: '', sections: sections[13], start: '15.01.14', end: '15.03.14' },
      { title: 'Литературный конкурс «Моя любимая школа»', url: 'literaturnyj-konkurs-moja-ljubimaja-shkola', price: '', sections: sections[13], start: '01.03.14', end: '31.05.14' },
      { title: 'Конкурс сочинений «Зимушка-красавица!»', url: 'konkurs-sochinenij-zimushka-krasavica!', price: '330', sections: sections[13] , start: '', end: ''},
      { title: 'Конкурс сочинений «Летнее вдохновение»', url: 'konkurs-sochinenij-letnee-vdohnovenie', price: '', sections: sections[13] , start: '', end: ''},
      { title: 'Литературный конкурс «Александр Сергеевич Пушкин - величайшее национальное достояние»', url: 'literaturnyj-konkurs-aleksandr-sergeevich-pushkin-velichajshee-nacionalnoe-dostojanie', price: '360', sections: sections[13] , start: '', end: ''},
      { title: 'Конкурс сочинений «Осенний калейдоскоп»', url: 'konkurs-sochinenij-osennij-kalejdoskop', price: '', sections: sections[13], start: '01.01.14', end: '01.03.14' },
      { title: 'Литературный конкурс «Старые сказки по-новому» (сценарии известных сказок на новый лад)', url: 'literaturnyj-konkurs-starye-skazki-po-novomu-scenarii-izvestnyh-skazok-na-novyj-lad', price: '', sections: sections[13] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области русского языка и литературы «Величие родного слова»', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-russkogo-jazyka-i-literatury-velichie-rodnogo-slova', price: '535', sections: [sections[13], sections[7]], start: '15.01.14', end: '15.03.14' },
      { title: 'Литературный конкурс «Народы России: культура и традиции»', url: 'literaturnyj-konkurs-narody-rossii-kultura-i-tradicii', price: '330', sections: [sections[13], sections[10]] , start: '', end: ''},
      { title: 'Литературный конкурс «Великая страна»', url: 'literaturnyj-konkurs-velikaja-strana', price: '', sections: [sections[13], sections[10]] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ «Изучаем родной язык»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-izuchaem-rodnoj-jazyk', price: '340', sections: [sections[13], sections[11]], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс на лучший молодежный проект в области творческого воспитания детей и подростков', url: 'konkurs-na-luchshij-molodezhnyj-proekt-v-oblasti-tvorcheskogo-vospitanija-detej-i-podrostkov', price: '', sections: sections[14], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс портфолио «Семейный альбом»', url: 'konkurs-portfolio-semejnyj-albom', price: '440', sections: sections[14] , start: '', end: ''},
      { title: 'Конкурс портфолио для педагогов «Горжусь своим учеником»', url: 'konkurs-portfolio-dlja-pedagogov-gorzhus-svoim-uchenikom', price: '', sections: sections[14], start: '15.01.14', end: '15.03.14' },
      { title: 'Конкурс социальных проектов и психолого-педагогических инициатив в области творческого воспитания детей и подростков', url: 'konkurs-socialnyh-proektov-i-psihologo-pedagogicheskih-iniciativ-v-oblasti-tvorcheskogo-vospitanija-detej-i-podrostkov', price: '', sections: sections[14] , start: '', end: ''},
      { title: 'Творческий конкурс «Мой любимый воспитатель»', url: 'tvorcheskij-konkurs-moj-ljubimyj-vospitatel', price: '', sections: sections[14], start: '01.01.14', end: '01.03.14' },
      { title: 'Творческий конкурс «Мой любимый учитель»', url: 'tvorcheskij-konkurs-moj-ljubimyj-uchitel', price: '', sections: sections[14] , start: '', end: ''},
      { title: 'Творческий конкурс «День космонавтики»', url: 'tvorcheskij-konkurs-den-kosmonavtiki', price: '', sections: sections[14] , start: '', end: ''},
      { title: 'Творческий конкурс «Праздничный май»', url: 'tvorcheskij-konkurs-prazdnichnyj-maj', price: '', sections: sections[14] , start: '', end: ''},
      { title: 'Творческий конкурс «Семейный портрет»', url: 'tvorcheskij-konkurs-semejnyj-portret', price: '', sections: sections[14] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ в области творческого воспитания детей и подростков', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-v-oblasti-tvorcheskogo-vospitanija-detej-i-podrostkov', price: '', sections: [sections[14], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области творческого воспитания детей и подростков', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-tvorcheskogo-vospitanija-detej-i-podrostkov', price: '', sections: [sections[14], sections[7]] , start: '', end: ''},
      { title: 'Конкурс общественных инициатив в области творческого воспитания детей и подростков', url: 'konkurs-obshhestvennyh-iniciativ-v-oblasti-tvorcheskogo-vospitanija-detej-i-podrostkov', price: '', sections: [sections[14], sections[8]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области творческого воспитания детей/юношества с ОВЗ.', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-tvorcheskogo-vospitanija-detej/junoshestva-s-ovz', price: '', sections: [sections[14], sections[9], sections[7]] , start: '', end: ''},
      { title: 'Исследовательский конкурс «Победители»', url: 'issledovatelskij-konkurs-pobediteli', price: '', sections: sections[15] , start: '', end: ''},
      { title: 'Конкурс «Спорт для всех»', url: 'konkurs-sport-dlja-vseh', price: '533', sections: sections[15] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области физической культуры и спорта «Здоровые дети — здоровое будущее»', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-fizicheskoj-kultury-i-sporta-zdorovye-deti-—-zdorovoe-budushhee', price: '530', sections: [sections[15], sections[7]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку в области физической культуры для детей/юношества с ОВЗ.', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-v-oblasti-fizicheskoj-kultury-dlja-detej/junoshestva-s-ovz', price: '', sections: [sections[15], sections[9], sections[7]] , start: '', end: ''},
      { title: 'Конкурс детских мероприятий и игровых программ по физкультуре «Чемпионская зарядка»', url: 'konkurs-detskih-meroprijatij-i-igrovyh-programm-po-fizkulture-chempionskaja-zarjadka', price: '330', sections: [sections[15], sections[11]], start: '01.02.14', end: '15.05.14' },
      { title: 'Конкурс фоторабот «Весенняя капель» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-fotorabot-vesennjaja-kapel-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[16], start: '01.02.14', end: '01.02.14' },
      { title: 'Конкурс фоторабот «В первый раз в первый класс»', url: 'konkurs-fotorabot-v-pervyj-raz-v-pervyj-klass', price: '', sections: sections[16] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Мой детский сад»', url: 'konkurs-fotorabot-moj-detskij-sad', price: '', sections: sections[16], start: '01.02.14', end: '01.04.14' },
      { title: 'Конкурс фоторабот «Моя школа»', url: 'konkurs-fotorabot-moja-shkola', price: '', sections: sections[16], start: '01.03.14', end: '31.05.14' },
      { title: 'Конкурс фоторабот «Зимушка-красавица!» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-fotorabot-zimushka-krasavica!-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '330', sections: sections[16] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Летнее вдохновение» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-fotorabot-letnee-vdohnovenie-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[16] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Осенний калейдоскоп» (дети дошкольного возраста, школьники и молодежь)', url: 'konkurs-fotorabot-osennij-kalejdoskop-deti-doshkolnogo-vozrasta-shkolniki-i-molodezh', price: '', sections: sections[16] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Моя мама»', url: 'konkurs-fotorabot-moja-mama', price: '', sections: sections[16], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс фоторабот «В объективе фотокамеры — Русь православная»', url: 'konkurs-fotorabot-v-obiektive-fotokamery-—-rus-pravoslavnaja', price: '330', sections: [sections[16], sections[1]] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Исторические памятники моего города»', url: 'konkurs-fotorabot-istoricheskie-pamjatniki-moego-goroda', price: '330', sections: [sections[16], sections[5]] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Природа моего края»', url: 'konkurs-fotorabot-priroda-moego-kraja', price: '330', sections: [sections[16], sections[5]] , start: '', end: ''},
      { title: 'Конкурс фоторабот «Великая страна»', url: 'konkurs-fotorabot-velikaja-strana', price: '', sections: [sections[16], sections[10]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс фоторабот «Минуты победы»', url: 'konkurs-fotorabot-minuty-pobedy', price: '', sections: [sections[16], sections[15]], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс на лучший молодежный проект по экологической культуре', url: 'konkurs-na-luchshij-molodezhnyj-proekt-po-jekologicheskoj-kulture', price: '', sections: sections[17], start: '01.01.14', end: '01.03.14' },
      { title: 'Конкурс на лучший инновационный проект по экологической культуре', url: 'konkurs-na-luchshij-innovacionnyj-proekt-po-jekologicheskoj-kulture', price: '', sections: sections[17] , start: '', end: ''},
      { title: 'Эколого-краеведческий конкурс «Природа родного края»', url: 'jekologo-kraevedcheskij-konkurs-priroda-rodnogo-kraja', price: '', sections: [sections[17], sections[5]] , start: '', end: ''},
      { title: 'Конкурс междисциплинарных проектов и программ в области эколого-краеведческого образования и просвещения', url: 'konkurs-mezhdisciplinarnyh-proektov-i-programm-v-oblasti-jekologo-kraevedcheskogo-obrazovanija-i-prosveshhenija', price: '', sections: [sections[17], sections[5], sections[6]] , start: '', end: ''},
      { title: 'Конкурс на лучшую методическую разработку по экологической культуре', url: 'konkurs-na-luchshuju-metodicheskuju-razrabotku-po-jekologicheskoj-kulture', price: '', sections: [sections[17], sections[7]] , start: '', end: ''},
      { title: 'Конкурс общественных инициатив по экологической культуре', url: 'konkurs-obshhestvennyh-iniciativ-po-jekologicheskoj-kulture', price: '', sections: [sections[17], sections[8]], start: '', end: '' }
    ];

    async.each(products, function (productData, callback) {
      var product = new mongoose.models.Product(productData);
      product.save(callback);
    }, callback);
  });
}
