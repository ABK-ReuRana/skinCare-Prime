$(document).ready(function () {
    $('.result').hide();
    $('.Actinic').hide();
    $('.Basal').hide();
    $('.Benign').hide();
    $('.Dermatofibroma').hide();
    $('.Melanoma').hide();
    $('.Melanocytic').hide();
    $('.Vascular').hide();


    //image_preview 
    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function (event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }

    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    $("#imgInp").change(function () {
        readURL(this);
        $('.result').text('');
        $('.result').show();
        $('.Actinic').hide();
        $('.Basal').hide();
        $('.Benign').hide();
        $('.Dermatofibroma').hide();
        $('.Melanoma').hide();
        $('.Melanocytic').hide();
        $('.Vascular').hide();
    });


    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                console.log(data);

                $('.result').fadeIn(600);
                $('.result').text(data);

                if (data == 'Actinic Keratoses') {
                    $('.Actinic').show();
                    $('.Basal').hide();
                    $('.Benign').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanoma').hide();
                    $('.Melanocytic').hide();
                    $('.Vascular').hide();
                }
                else if (data == 'Basal Cell Carcinoma') {
                    $('.Basal').show();
                    $('.Actinic').hide();
                    $('.Benign').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanoma').hide();
                    $('.Melanocytic').hide();
                    $('.Vascular').hide();
                }
                else if (data == 'Benign Keratosis') {
                    $('.Benign').show();
                    $('.Actinic').hide();
                    $('.Basal').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanoma').hide();
                    $('.Melanocytic').hide();
                    $('.Vascular').hide();
                }
                else if (data == 'Dermatofibroma') {
                    $('.Dermatofibroma').show();
                    $('.Actinic').hide();
                    $('.Basal').hide();
                    $('.Benign').hide();
                    $('.Melanoma').hide();
                    $('.Melanocytic').hide();
                    $('.Vascular').hide();
                } 
                else if (data == 'Melanoma') {
                    $('.Melanoma').show();
                    $('.Actinic').hide();
                    $('.Basal').hide();
                    $('.Benign').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanocytic').hide();
                    $('.Vascular').hide();
                }
                else if (data == 'Melanocytic Nevi') {
                    $('.Melanocytic').show();
                    $('.Actinic').hide();
                    $('.Basal').hide();
                    $('.Benign').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanoma').hide();
                    $('.Vascular').hide();
                } 
                else if (data == 'Vascular skin lesion') {
                    $('.Vascular').show();
                    $('.Actinic').hide();
                    $('.Basal').hide();
                    $('.Benign').hide();
                    $('.Dermatofibroma').hide();
                    $('.Melanoma').hide();
                    $('.Melanocytic').hide();
                }
                console.log('Success!');
            },
        });
    });
});
