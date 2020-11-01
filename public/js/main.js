document.querySelector("#submit-btn").addEventListener('click', async function (e) {
    const formData = new FormData();
    document.querySelector('#result-img').src = '/assets/images/loading.gif';
    formData.append('content', document.querySelector('#content').querySelector('input').files.item(0));
    formData.append('style', document.querySelector('#style').querySelector('input').files.item(0));
    const res = await fetch('/', {
        method: 'POST',
        body: formData
    });
    const json = JSON.parse(await res.json());
    console.log('/assets/uploads/' + json['output']);
    document.querySelector('#result-img').src = '/assets/uploads/' + json['output'];
});

function uploadImage(type) {
    const container = document.querySelector('#' + type);
    const input = container.querySelector('input');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) { 
            container.querySelector('.image-upload-wrap').style.display = 'none';
            container.querySelector('.file-upload-image').src = e.target.result;
            container.querySelector('.file-upload-content').style.display = 'inline-block';
        }
        reader.readAsDataURL(input.files[0]);    
    } else {
        removeImage(type);
    }
}

function removeImage(type) {
    const container = document.querySelector('#' + type);
    container.querySelector('input').value = null;
    container.querySelector('.image-upload-wrap').style.display = 'block';
    container.querySelector('.file-upload-content').style.display = 'none';
}
