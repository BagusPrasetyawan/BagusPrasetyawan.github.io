/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-const-assign */
const base_url = 'https://api.football-data.org/v2/';
const details = `${base_url}teams/`;
const fetchApi = (konek) => fetch(konek, {
  headers: {
    'X-Auth-Token': '9909c758dad24fb58612b7e2ae327598',
  },
});
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  }
  // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
  return Promise.resolve(response);
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log(`Error : ${error}`);
}
// Blok kode untuk melakukan request data json
function getArticles() {
  if ('caches' in window) {
    caches.match(`${base_url}competitions/2014/teams`).then((response) => {
      if (response) {
        response.json().then((data) => {
          let articlesHTML = '';
          data.teams.forEach((team) => {
            articlesHTML += `
                      <div class="card medium col s12 m4">
                        <a href="./article.html?id=${team.id}">
                          <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.crestUrl}" width="250px" height="250px" style="margin-top:20px;" />
                          </div>
                        </a>
                        <div class="card-content">
                          <span class="card-title truncate"><b>${team.name}</b></span>
                          <p>
                          ${team.address} <br>
                          ${team.website} <br>
                          ${team.venue} <br>
                          </p>
                        </div>
                      </div>
                    `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById('articles').innerHTML = articlesHTML;
        });
      }
    });
  }
  fetchApi(`${base_url}competitions/2014/teams`)
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = '';
      data.teams.forEach((team) => {
        articlesHTML += `
              <div class="card medium col s12 m4">
                <a href="./article.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" width="200px" height="200px" style="margin-top:20px;" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate"><b>${team.name}</b></span>
                  <p>
                  ${team.address} <br>
                  ${team.website} <br>
                  ${team.venue} <br>
                  </p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById('articles').innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    if ('caches' in window) {
      caches.match(`${details}${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            const articleHTML = `
        <div class="container">
          <div class="row">
            <div class="card col s12 m12">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" width="200px" height="200px" style="margin-top:20px;" />
            </div>
            <div class="card-content">
              <span class="card-title"><b>${data.name}</b></span>
              ${data.shortName} <br>
              ${data.address} <br>
              ${data.website} <br>
              ${data.venue} <br>
              ${data.email} <br>
            </div>
          </div>
      </div>
    </div>
    `;

            document.getElementById('body-content').innerHTML = articleHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
            let tableHTML = '';
            data.squad.forEach((team) => {
              tableHTML += `
          <tr>
          <td>${team.name}</td>
          <td>${team.position}</td>
          <td>${team.countryOfBirth}</td>
          <td>${team.nationality}</td>
          <td>${team.role}</td>
          </tr>
    `;
              const isitableHTML = `
      
      <div class="row">
      <div class="card col s12 m12">
        <table class="striped responsive-table">
            <tr style="text-align: center;">
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Country of Birth</th>
              <th scope="col">Nationality</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody style="text-align: center;">
          ${tableHTML}
          </table>
        </div>
      </div>
    
    `;
              document.getElementById('tables').innerHTML = isitableHTML;
              // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
              resolve(data);
            });
          });
        }
      });
    }
    fetchApi(`${details}${idParam}`)
      .then(status)
      .then(json)
      .then((data) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // Menyusun komponen card artikel secara dinamis
        const articleHTML = `
        <div class="container">
          <div class="row">
            <div class="card col s12 m12">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" width="200px" height="200px" style="margin-top:20px;" />
            </div>
            <div class="card-content">
              <span class="card-title"><b>${data.name}</b></span>
              ${data.shortName} <br>
              ${data.address} <br>
              ${data.website} <br>
              ${data.venue} <br>
              ${data.email} <br>
            </div>
          </div>
      </div>
    </div>
    `;

        document.getElementById('body-content').innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
        let tableHTML = '';
        data.squad.forEach((team) => {
          tableHTML += `
              <tr>
              <td>${team.name}</td>
              <td>${team.position}</td>
              <td>${team.countryOfBirth}</td>
              <td>${team.nationality}</td>
              <td>${team.role}</td>
              </tr>
        `;
          const isitableHTML = `
          
          <div class="row">
          <div class="card col s12 m12">
            <table class="striped responsive-table">
                <tr style="text-align: center;">
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Country of Birth</th>
                  <th scope="col">Nationality</th>
                  <th scope="col">Role</th>
                </tr>
              </thead>
              <tbody style="text-align: center;">
              ${tableHTML}
              </table>
            </div>
          </div>
        
        `;
          document.getElementById('tables').innerHTML = isitableHTML;
          // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
          resolve(data);
        });
      });
  });
}

function getSavedArticles() {
  getAll().then((articles) => {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = '';
    articles.forEach((team) => {
      articlesHTML += `
                    <div class="card medium col s12 m4">
                    <a href="./article.html?id=${team.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" width="200px" height="200px" style="margin-top:20px;" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate"><b>${team.name}</b></span>
                      <p>
                      ${team.address} <br>
                      ${team.website} <br>
                      ${team.venue} <br>
                      </p>
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById('body-content').innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');

  getById(idParam).then((data) => {
    articleHTML = '';
    var articleHTML = `
    <div class="container">
          <div class="row">
            <div class="card col s12 m12">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" width="200px" height="200px" style="margin-top:20px;" />
            </div>
            <div class="card-content">
              <span class="card-title"><b>${data.name}</b></span>
              ${data.shortName} <br>
              ${data.address} <br>
              ${data.website} <br>
              ${data.venue} <br>
              ${data.email} <br>
            </div>
          </div>
      </div>
    </div>
  `;
    document.getElementById('body-content').innerHTML = articleHTML;
    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    resolve(data);
    let tableHTML = '';
    data.squad.forEach((team) => {
      tableHTML += `
        <tr>
        <td>${team.name}</td>
        <td>${team.position}</td>
        <td>${team.countryOfBirth}</td>
        <td>${team.nationality}</td>
        <td>${team.role}</td>
        </tr>
  `;
      const isitableHTML = `
    
    <div class="row">
    <div class="card col s12 m12">
      <table class="striped responsive-table">
          <tr style="text-align: center;">
            <th scope="col">Name</th>
            <th scope="col">Position</th>
            <th scope="col">Country of Birth</th>
            <th scope="col">Nationality</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody style="text-align: center;">
        ${tableHTML}
        </table>
      </div>
    </div>
  
  `;
      document.getElementById('tables').innerHTML = isitableHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    });
  });
}
