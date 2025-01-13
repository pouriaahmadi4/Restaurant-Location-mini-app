//TODO Selecting all retaurants(list items in a nodelist to loop throygh)

const links = document.querySelectorAll("a");
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const inputSearch = document.querySelector("#input-search");
const restaurantsList = document.querySelector(".restaurants-list");
const listItems = document.querySelectorAll(".restaurant");
const buttonsContainer = document.querySelector(".buttons");
const toggleButtons = document.querySelector(".toggle-buttons");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const addBtn = document.querySelector(".add-btn");
const btnCloseModal = document.querySelector(".btn--close-modal");
const sortButtons = document.querySelectorAll(".sort__btn");

//modal elements selection
const modalResName = document.getElementById("res-name");
const modalResPicture = document.getElementById("res-picture");
const modalTagName = document.querySelectorAll(".tag__name");
const modalAddBtn = document.querySelector(".add__btn");
const modalTagList = document.querySelector(".tag__list");

//TODO selecting all links in each item for preventing link default (prevent page refresh)

const linkDefaultPreventer = () => {
  links.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });
};

//TODO restaurants array of objects

const restaurants = [
  {
    id: 1,
    name: "Akbar Joojeh",
    imgUrl:
      "https://www.akbarjoojeh.com/wp-content/uploads/2020/02/IMG_20200205_104013_404-1024x768.jpg",
    rating: 3.2,
    categories: ["akbar jooje", "Sos", "Berenj"],
    distance: 5.3,
  },
  {
    id: 2,
    name: "Bodega",
    imgUrl:
      "https://www.lettersandsigns.com/wp-content/uploads/elementor/thumbs/Layered-Red-Black-Acrylic-Sign-Bodega-Restaurant-1-pzb6prcdrc5le6apypbx8u2667vq157h06y9m90q06.jpg",
    rating: 4.5,
    categories: ["Tacos", "Burritos", "Quesadillas"],
    distance: 8.1,
  },
  {
    id: 3,
    name: "Maggie",
    imgUrl:
      "https://www.lettersandsigns.com/wp-content/uploads/2020/06/custom-formed-plastic-letters-edge-paint-maggie.jpg",
    rating: 2.8,
    categories: ["Pizza", "Pasta", "Salads"],
    distance: 3.2,
  },
  {
    id: 4,
    name: "Olive Garden",
    imgUrl:
      "https://lirp.cdn-website.com/2afda7a4/dms3rep/multi/opt/OliveGarden-640w.jpg",

    rating: 4.0,
    categories: ["Chicken Wings", "Tenders", "Loaded Fries"],
    distance: 6.5,
  },
  {
    id: 5,
    name: "Chiller Bee",
    imgUrl:
      "https://www.nationalsigns.com/wp-content/uploads/2022/01/restaurants-header.jpg",
    rating: 0.3,
    categories: ["Sushi Rolls", "Bento Boxes", "Edamame"],
    distance: 10.7,
  },
  {
    id: 6,
    name: "Mary Browns",
    imgUrl:
      "https://images.squarespace-cdn.com/content/v1/5d39bf51b437ad00019c7732/1565277039229-E3G3TJLZA15MD6XYSNE5/DSC04568+%281%29.JPG",
    rating: 4.6,
    categories: ["Burritos", "Nachos", "Churros"],
    distance: 7.8,
  },
  {
    id: 7,
    name: "Casa Salon",
    imgUrl:
      "https://mindfuldesignconsulting.com/wp-content/uploads/2023/03/Carved-Wood-Outdoor-Sign-Restaurant-Design.jpg",
    rating: 4.1,
    categories: ["Grilled Cheese", "Tomato Soup", "Sweet Potato Fries"],
    distance: 2.5,
  },
  {
    id: 8,
    name: "Coventry Cafe",
    imgUrl:
      "https://res.cloudinary.com/woodland/image/upload/c_limit,d_ni.png,f_auto,q_auto,w_1024/v1/woodland_media/media/catalog/product/e/m/emi_plastic_injection_molded_roman_5.jpg",
    rating: 4.4,
    categories: ["Wraps", "Salads", "Smoothies"],
    distance: 12.0,
  },
  {
    id: 9,
    name: "Shaandiz",
    imgUrl:
      "https://googlemenu.ir/wp-content/uploads/2020/11/09d979ae4bbf5892bb90576d44101520_zzz-1.jpg",
    rating: 5.0,
    categories: ["Soltani", "Joojeh", "Koobideh"],
    distance: 8.9,
  },
  {
    id: 10,
    name: "Baldoria",
    imgUrl: "https://www.candybar.co/wp-content/uploads/2019/07/image83.jpg",
    rating: 4.7,
    categories: ["Sausages", "Pretzels", "Craft Beer"],
    distance: 4.1,
  },
];

//TODO restaurants list showing function
const showRestaurants = function (restaurantsArr) {
  restaurantsList.innerHTML = "";
  if (restaurantsArr.length === 0) {
    restaurantsList.innerHTML = `
    <div class="restaurant--not-found">
      <img src="https://images.pexels.com/photos/3250364/pexels-photo-3250364.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="no restaurant found">
      <h3 class="no-restaurant__heading">No Restaurants Found</h3>
    </div>
    `;
  } else {
    restaurantsArr.forEach((restaurant) => {
      // GENERATE TAGS HTML
      let newTagsHTML = "";
      if (restaurant.categories && restaurant.categories.length > 0) {
        restaurant.categories.forEach((category) => {
          newTagsHTML += `<li class="tag-item"><a href="#">${category}</a></li>`;
        });
      }

      // GENERATE STARS HTML
      let newStarsHTML = "";
      for (let i = 0; i < 5; i++) {
        const starClass =
          i < Math.round(restaurant.rating) ? "star-active" : "star-inactive";
        newStarsHTML += `<svg class="${starClass}" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24"
        viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>`;
      }

      // GENERATE RESTAURANT ITEM HTML
      const newRestaurantHTML = `<li class="restaurant">
                <div class="restaurant-info">
                    <div class="restaurant-left">
                        <img class="restaurant-image" src="${restaurant.imgUrl}" alt="${restaurant.name}">
                        <div class="restaurant-data">
                            <h3>${restaurant.name}</h3>
                            <ul class="tags-list">
                                ${newTagsHTML}
                            </ul>
                            <div class="stars">
                                ${newStarsHTML}
                            </div>   
                        </div>
                    </div>
                    <div class="restaurant-right">
                <div class="right__direction">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 30 30"
                style="fill: var(--clr-ternary)"
              >
                <path
                  d="m2.295 12.707 8.978 9c.389.39 1.025.391 1.414.002l9.021-9a1 1 0 0 0 0-1.416l-9.021-9a.999.999 0 0 0-1.414.002l-8.978 9a.998.998 0 0 0 0 1.412zm6.707-2.706h5v-2l3 3-3 3v-2h-3v4h-2v-6z"
                ></path>
              </svg>
                <span>${restaurant.distance} kms</span>
                </div>
                <button class="toggle-buttons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style="fill: var(--clr-secondry)"
                      >
                        <path
                          d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"
                        ></path>
                      </svg>
                    </button>
              </div>
                    
                </div>
                
              <div class="buttons">
                <button class="call-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(201, 23, 23, 1);"><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M8 11h8v2H8z"></path></svg>
              <span>Delete</span>
            </button>
            <button class="bookmark-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(49, 156, 247, 1)"
              >
                <path
                  d="M12 11.222 14.667 13l-.89-3.111L16 8l-2.667-.333L12 5l-1.333 2.667L8 8l2.223 1.889L9.333 13z"
                ></path>
                <path
                  d="M19 21.723V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v17.723l7-4.571 7 4.571zM8 8l2.667-.333L12 5l1.333 2.667L16 8l-2.223 1.889.89 3.111L12 11.222 9.333 13l.89-3.111L8 8z"
                ></path>
              </svg>
              <span>Bookmark</span>
            </button>
          </div>
            </li>
            `;
      restaurantsList.insertAdjacentHTML("beforeEnd", newRestaurantHTML);
    });
    buttonsToggler();
  }
};

// Toggling the search field
const searchToggler = () => {
  searchBtn.addEventListener("click", (e) => {
    searchBox.classList.toggle("search--active");
    if (searchBox.classList.contains("search--active")) {
      setTimeout(() => {
        inputSearch.focus();
      }, 500);
    }
  });
};

//TODO open modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//TODO close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//TODO Add Restaurant ==> Modal
const addRestaurant = () => {
  addBtn.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
};

//TODO creating array of user-selected tags

let selectedTagsArr = [];
const threeTagsEntry = function () {
  modalTagName.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      const selectedTag = e.target;
      if (
        selectedTag.tagName === "LI" &&
        selectedTag.classList.contains("selected")
      ) {
        selectedTag.classList.remove("selected");
        const tagIndex = selectedTagsArr.indexOf(selectedTag.textContent);
        if (tagIndex > -1) {
          selectedTagsArr.splice(tagIndex, 1);
        }
      } else if (selectedTagsArr.length < 3) {
        selectedTag.classList.add("selected");
        selectedTagsArr.push(selectedTag.textContent);
      }
    });
  });
  return selectedTagsArr;
};

//TODO NEW RESTAURANT

function NewRestaurantConstructor(resName, resPicture, selectedTags) {
  this.id = restaurants.length ? restaurants[restaurants.length - 1].id + 1 : 1;
  this.name = resName;
  this.imgUrl = resPicture;
  this.rating = Number.parseFloat(Math.random() * 5).toFixed(1);
  this.categories = selectedTags;
  console.log("New Restaurant:", this);
  this.distance = Number.parseFloat(Math.random() * 10).toFixed(1);
}

//TODO constructor and threeTagEntry

const selectedTags = threeTagsEntry();
function userNewRes() {
  modalAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("tagsArray", selectedTags);
    const file = modalResPicture.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgUrl = e.target.result;
        const newItem = new NewRestaurantConstructor(
          modalResName.value,
          imgUrl,
          selectedTagsArr.slice()
        );

        restaurants.push(newItem);
        showRestaurants(restaurants);
        closeModal();

        //initiallization for next item
        modalResName.value = "";
        modalResPicture.value = "";
        selectedTagsArr = [];
        modalTagList
          .querySelectorAll(".selected")
          .forEach((tag) => tag.classList.remove("selected"));
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please upload a Restaurant Picture");
    }
  });
}

//TODO Sorting
const sortRestaurants = function (restaurants, sortType) {
  switch (sortType) {
    case "0":
      return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
    case "1":
      return [...restaurants].sort((a, b) => a.distance - b.distance);
    case "2":
      return [...restaurants].sort((a, b) => b.rating - a.rating);
    default:
      return restaurants;
  }
};

const sortAndRender = function () {
  sortButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortType = btn.getAttribute("data-sort");
      const sortedRestaurants = sortRestaurants(restaurants, sortType);
      showRestaurants(sortedRestaurants);
    });
  });
};

//TODO Search Field Filtering
const searchRes = () => {
  inputSearch.addEventListener("input", (e) => {
    if (inputSearch.value.length > 0) {
      const filteredRestaurants = restaurants.filter((res) =>
        res.name.toLowerCase().includes(inputSearch.value.trim().toLowerCase())
      );
      showRestaurants(filteredRestaurants);
    } else {
      showRestaurants(restaurants);
    }
  });
};

//TODO Bookmark and Call buttons sli___iding
const buttonsToggler = () => {
  const toggleButtons = document.querySelectorAll(".toggle-buttons");

  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const slider = e.currentTarget.closest(".restaurant").lastElementChild;
      slider.classList.toggle("buttons--active");

      btn.style.display = slider.classList.contains("buttons--active")
        ? "none"
        : "flex";
    });
  });

  //TODO closing buttonsContainer while clicked outside of it

  document.addEventListener("click", (e) => {
    toggleButtons.forEach((button) => {
      const slider = button.closest(".restaurant").querySelector(".buttons");
      if (!slider.contains(e.target) && !button.contains(e.target)) {
        slider.classList.remove("buttons--active");
        button.style.display = "flex";
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  linkDefaultPreventer();
  buttonsToggler();
  searchToggler();
  searchRes();
  addRestaurant();
  sortAndRender();
  userNewRes();
  showRestaurants(restaurants);
});
