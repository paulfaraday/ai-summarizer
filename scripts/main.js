function openTab(event, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += " active";
}

$("#text-form").submit(function (event) {
    event.preventDefault();

    // Hide response, error and raw JSON containers
    $('#response-container').css("display", "none");
    $('#error-container').css("display", "none");
    $('#raw-output-container').css("display", "none");

    // Show loading spinner
    $('#loading-container').css("display", "block");
    $.ajax({
        url: 'https://ai-summarizer.herokuapp.com/summary',
        type: 'POST',
        data: {
            input: $('#input_text').val()
        },
        success: function (data, textStatus, jqXHR) {
            // Hide loading spinner
            $('#loading-container').css("display", "none");

            // Write response to respective elements and show it
            $('#response').html(data.summary);
            $('#response-container').css("display", "block");
            $('#json-output').html(JSON.stringify(data, null, 4));
            $('#raw-output-container').css("display", "block");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Hide loading spinner
            $('#loading-container').css("display", "none");

            // If server returns an error message
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                // Write response to respective elements and show it
                $('#error-message').html(jqXHR.responseJSON.message);
                $('#json-output').html(JSON.stringify(jqXHR.responseJSON, null, 4));
                $('#raw-output-container').css("display", "block");
            } else {
                // Else, write a generic error message and show it
                $('#error-message').html("An error occured! Please try again later");
            }
            $('#error-container').css("display", "block");
        }
    });
})

$("#pdf-form").submit(function (event) {
    event.preventDefault();

    // Hide response, error and raw JSON containers
    $('#response-container').css("display", "none");
    $('#error-container').css("display", "none");
    $('#raw-output-container').css("display", "none");

    // Show loading spinner
    $('#loading-container').css("display", "block");

    // Generate formdata with file
    var formData = new FormData($(this)[0]);
    $.ajax({
        url: 'https://ai-summarizer.herokuapp.com/pdfSummary',
        type: 'POST',
        data: formData,
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data, textStatus, jqXHR) {
            // Hide loading spinner
            $('#loading-container').css("display", "none");

            // Write response to respective elements and show it
            $('#response').html(data.summary);
            $('#response-container').css("display", "block");
            $('#json-output').html(JSON.stringify(data, null, 4));
            $('#raw-output-container').css("display", "block");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Hide loading spinner
            $('#loading-container').css("display", "none");

            // If server returns an error message
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                // Write response to respective elements and show it
                $('#error-message').html(jqXHR.responseJSON.message);
                $('#json-output').html(JSON.stringify(jqXHR.responseJSON, null, 4));
                $('#raw-output-container').css("display", "block");
            } else if (jqXHR.status == 413) {
                // If file size is larger than limit, communicate that as error message
                $('#error-message').html("Your file was too large to process. Please upload a file with size less than 1MB");
            } else {
                // Else, write a generic error message and show it
                $('#error-message').html("An error occured! Please try again later");
            }
            $('#error-container').css("display", "block");
        }
    });
})