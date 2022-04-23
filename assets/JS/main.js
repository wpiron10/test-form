const $ = document;
$.addEventListener("DOMContentLoaded", () => {
  console.log("document loaded");

  $.querySelector("#contactForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      prenom: $.querySelector("#prenom").value,
      nom: $.querySelector("#nom").value,
      email: $.querySelector("#email").value,
      sujet: $.querySelector("#sujet").value,
      message: $.querySelector("#message").value,
    };
    console.log(data);

    const response = await axios.post("http://localhost:3000/form", data);
    console.log(response.data);
  });
});
