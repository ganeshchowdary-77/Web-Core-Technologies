document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value;
    const phone = document.getElementById("phoneNumber").value;
    const category = document.getElementById("category").value;
    const guests = document.getElementById("guests").value;
    const checkin = document.getElementById("checkin").value;
    const checkinTime = document.getElementById("checkinTime").value;
    const checkout = document.getElementById("checkout").value;
    const checkoutTime = document.getElementById("checkoutTime").value;

    const purpose = document.querySelector('input[name="purpose"]:checked').value;

    const services = [];
    document.querySelectorAll('.checkbox-group input:checked').forEach(cb => {
        services.push(cb.value);
    });

    const message =
`Farm House Booking Request 🏡

Name: ${name}
Phone: ${phone}
Category: ${category}
Purpose: ${purpose}
Guests: ${guests}

Services:
${services.length ? services.join(", ") : "None"}

Check-in:
${checkin} at ${checkinTime}

Check-out:
${checkout} at ${checkoutTime}
`;

    const whatsappNumber = "9380202261";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
});
