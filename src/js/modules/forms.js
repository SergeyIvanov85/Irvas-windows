import checkNumInputs from "./checkNumInputs";



const forms = (state) => {
  const form = document.querySelectorAll('form'),
  inputs = document.querySelectorAll('input');



  //в инпут телефона вводить можно только цифры
  checkNumInputs('input[name="user_phone"]');
  

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

// функция которая отвечает за отправку запроса:
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    return await res.text();
  };

//функция по очищению всех инпутов
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    })
  }
//перебираем все формы
  form.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      //отправляем данные модального калькулятора на сервер после отправки формы
      if (item.getAttribute('data-calc') === "end") {
        for (let key in state) {
          formData.append(key, state[key]);
        };
      };

//отправляем запрос на сервер
      postData('assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent = message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  });
};

export default forms;