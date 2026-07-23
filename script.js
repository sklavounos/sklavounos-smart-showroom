// =========================
// Αναζήτηση από index.html
// =========================
function openProduct() {

    const input = document.getElementById("productId");

    if (!input) return;

    const id = input.value.trim();

    if (id === "") {
        alert("Πληκτρολογήστε αριθμό προϊόντος.");
        return;
    }

    window.location.href = "product.html?id=" + id;
}

// =========================
// Φόρτωση προϊόντος
// =========================
window.onload = async function () {

    // Αν δεν είμαστε στο product.html δεν κάνουμε τίποτα
    if (!window.location.pathname.endsWith("product.html")) {
        return;
    }

    // Παίρνουμε το id από το URL
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    try {

        // Διαβάζουμε τη βάση
        const response = await fetch("database.json");
        const data = await response.json();

        // Βρίσκουμε το προϊόν
        const product = data.products.find(p => p.id === id);

        // Αν δεν βρεθεί
        if (!product) {

            document.querySelector(".card").innerHTML = `
                <h1 class="logo">🔥 SKLAVOUNOS SMART SHOWROOM</h1>

                <div style="text-align:center;padding:40px 20px;">

                    <h2 style="color:#d32f2f;">
                        ❌ Το προϊόν δεν βρέθηκε
                    </h2>

                    <p style="font-size:20px;margin:30px 0;">
                        Το προϊόν που αναζητήσατε δεν υπάρχει.
                    </p>

                    <a href="index.html" class="button">
                        ⬅ Επιστροφή στην αναζήτηση
                    </a>

                </div>
            `;

            return;
        }

        // Συμπλήρωση στοιχείων
        document.getElementById("productTitle").textContent = product.title;
        document.getElementById("productCategory").textContent = product.category;
        document.getElementById("productCompany").textContent = product.company;
        document.getElementById("productDescription").textContent = product.description;
        document.getElementById("productPrice").textContent = product.price;

        document.getElementById("productImage").src = product.image;
        document.getElementById("productImage").alt = product.title;

        document.getElementById("productPdf").href = product.pdf;

        document.title = product.title;

    } catch (error) {

        console.error(error);

        document.querySelector(".card").innerHTML = `
            <h1 class="logo">🔥 SKLAVOUNOS SMART SHOWROOM</h1>

            <div style="text-align:center;padding:40px 20px;">

                <h2 style="color:#d32f2f;">
                    Σφάλμα φόρτωσης
                </h2>

                <p>
                    Δεν ήταν δυνατή η φόρτωση των στοιχείων του προϊόντος.
                </p>

                <a href="index.html" class="button">
                    ⬅ Επιστροφή
                </a>

            </div>
        `;
    }

};
