// Template for render navbar on all pages
const head = document.querySelector('#head');

let navbar = `
        <nav class="navbar navbar-expand-md bg-dark navbar-dark py-3">
            <div class="container">
                <!-- Logo & Icon -->            
                <a href="index.html" class="navbar-brand text-warning logo"><span class="material-symbols-outlined">
                        <i class="ri-headphone-fill ri-sm"></i>
                    </span> SmartStore</a>
                <!-- Hamburger menu -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><span
                        class="navbar-toggler-icon"></span></button>
                <!-- Menu List -->
                <div class="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a href="index.html" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="products.html" class="nav-link">Products</a>
                        </li>
                        <li class="nav-item">
                            <a href="about.html" class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="contacts.html" class="nav-link">Contacts</a>
                        </li>
                    </ul>
                    <a class="nav-item cart text-warning align-content-center" data-bs-toggle="modal"
                        data-bs-target="#modal-cart"><i class="ri-shopping-cart-line ri-lg m-1"></i><span
                            class="badge border border-warning cart-badge"></span></a>
                </div>
            </div>
        </nav>`;

head.innerHTML = navbar;