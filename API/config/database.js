const { Client } = require('pg');

// Configuración de la base de datos
const dbConfig = {
  user: process.env.PGUSER || 'admin',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'mydb',
  password: process.env.PGPASSWORD || 'secret',
  port: process.env.PGPORT || 5432,
};

// Cliente de base de datos
const client = new Client(dbConfig);

// Conectar a la base de datos
async function connectDB() {
  try {
    await client.connect();
    console.log('🟢 Conectado a PostgreSQL');
  } catch (error) {
    console.error('🔴 Error conectando a PostgreSQL:', error);
    process.exit(1);
  }
}

// Función para ejecutar consultas
async function query(text, params) {
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('🔴 Error en consulta:', error);
    throw error;
  }
}

// Función para cerrar la conexión
async function closeDB() {
  try {
    await client.end();
    console.log('🔌 Conexión a PostgreSQL cerrada');
  } catch (error) {
    console.error('🔴 Error cerrando conexión:', error);
  }
}

module.exports = {
  client,
  connectDB,
  query,
  closeDB
}; 

Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
Magna dolor id Lorem exercitation velit. Ex reprehenderit consequat sunt cillum esse do sit magna mollit anim consectetur. Aliquip voluptate irure dolore ex deserunt commodo adipisicing non consequat do fugiat. In aliqua velit reprehenderit non incididunt ipsum incididunt. Aliqua non ipsum anim occaecat ad officia ad sunt dolor esse irure id.

Irure officia est proident nulla commodo cillum mollit qui exercitation Lorem ut excepteur anim. In ut excepteur amet tempor proident reprehenderit anim irure. Pariatur nisi quis pariatur duis id non aliqua laborum officia. In nulla culpa reprehenderit non laborum enim. Excepteur cillum sunt pariatur fugiat cupidatat labore non ipsum occaecat eiusmod tempor culpa.

Qui dolor mollit veniam duis id est mollit Lorem eu esse enim. Incididunt incididunt dolore proident minim. Exercitation magna occaecat do aute do nisi et nisi consequat deserunt proident dolor. Lorem aliqua duis ut ea fugiat ut sint proident aliquip amet veniam in cupidatat. Consectetur laboris cupidatat esse quis nostrud do commodo occaecat eu enim non pariatur dolor.

Magna incididunt consectetur aliquip dolore commodo. Officia irure anim cupidatat incididunt ipsum anim cillum Lorem nulla sit non veniam. Velit reprehenderit consequat ad qui quis. Elit Lorem excepteur consequat sunt aute pariatur nostrud commodo exercitation occaecat aute consequat ipsum. Dolor commodo magna deserunt do occaecat excepteur laborum ex.

Non occaecat ipsum cillum pariatur. Minim occaecat mollit ea consequat. Id occaecat laboris officia labore. Incididunt elit est laborum aliqua Lorem. Lorem irure qui Lorem duis. Aliqua laboris deserunt ea deserunt magna voluptate est proident enim cillum consectetur qui.

Sit tempor eu aute ad eu nulla. Est velit aute do ad dolor dolore occaecat voluptate ipsum incididunt eu laborum in. Mollit dolor proident consequat tempor aute incididunt pariatur minim commodo.

Id et magna esse Lorem est duis ullamco. Nostrud ea magna fugiat aliqua dolore labore ullamco eu cillum et. Irure Lorem proident incididunt duis et. Laboris reprehenderit magna deserunt elit. Ipsum excepteur eiusmod est eiusmod nulla minim veniam proident aute quis id ex. Minim tempor cillum nisi aute ullamco ex veniam dolore nostrud ullamco exercitation sunt voluptate magna. Dolore ad duis id minim laborum ad ex aliqua laborum et non.

Velit ipsum irure officia duis mollit nostrud aliquip nisi sunt elit irure enim elit. Veniam ullamco ipsum cillum id tempor enim ullamco ad fugiat enim. Mollit elit anim voluptate consectetur eiusmod irure dolor. Elit sit ut minim Lorem irure non aliquip eiusmod culpa. Ea et commodo do nisi labore ipsum nostrud non velit. Sint in amet et non magna non cupidatat elit aliqua. Id adipisicing ut nisi et reprehenderit consectetur do reprehenderit nostrud.

Labore minim irure voluptate consectetur ipsum. Lorem est aute consequat eu est Lorem nulla. Veniam aute fugiat nisi do proident eiusmod. Qui sint aliquip ad ullamco dolore aliqua nisi officia sit eu minim. Non do sunt in non officia ullamco nulla amet cupidatat sit deserunt ea proident.

Id id ea laborum magna nulla sit amet labore esse tempor elit nulla. Eu consequat velit nulla duis ea velit veniam tempor reprehenderit ullamco velit. Sit excepteur magna enim mollit laboris et laboris.<<
