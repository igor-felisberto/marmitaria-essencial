const marmita = document.getElementById("marmita");
const quantidade = document.getElementById("quantidade");
const adicionais = document.querySelectorAll(".adicional");
const entregas = document.querySelectorAll('input[name="entrega"]');

const totalTexto = document.getElementById("total");
const botaoPedido = document.getElementById("pedido");

function calcularTotal() {

  const precoMarmita = Number(marmita.value);
  const qtd = Number(quantidade.value);

  let total = precoMarmita * qtd;

  adicionais.forEach(adicional => {

    if (adicional.checked) {
      total += Number(adicional.value) * qtd;
    }

  });

  const entregaSelecionada =
    document.querySelector('input[name="entrega"]:checked');

  total += Number(entregaSelecionada.value);

  totalTexto.textContent =
    total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  return total;
}

marmita.addEventListener("change", calcularTotal);
quantidade.addEventListener("input", calcularTotal);

adicionais.forEach(adicional => {
  adicional.addEventListener("change", calcularTotal);
});

entregas.forEach(entrega => {
  entrega.addEventListener("change", calcularTotal);
});

botaoPedido.addEventListener("click", () => {

  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  const mistura =
    document.getElementById("mistura").value;

  const pagamento =
    document.getElementById("pagamento").value;

  if (nome === "") {
    alert("Digite seu nome.");
    return;
  }

  const marmitaSelecionada =
    marmita.options[marmita.selectedIndex];

  const nomeMarmita =
    marmitaSelecionada.dataset.nome;

  let listaAdicionais = [];

  adicionais.forEach(adicional => {

    if (adicional.checked) {
      listaAdicionais.push(adicional.dataset.nome);
    }

  });

  if (listaAdicionais.length === 0) {
    listaAdicionais.push("Nenhum");
  }

  const entregaSelecionada =
    document.querySelector('input[name="entrega"]:checked');

  const tipoEntrega =
    entregaSelecionada.value === "0"
      ? "Retirada no local"
      : "Entrega";

  const total = calcularTotal();

  const mensagem = `
🍱 *NOVO PEDIDO*

👤 Nome: ${nome}

🍛 Marmita: ${nomeMarmita}
🍗 Mistura: ${mistura}
🔢 Quantidade: ${quantidade.value}

➕ Adicionais:
${listaAdicionais.join(", ")}

🚚 Recebimento: ${tipoEntrega}

📍 Endereço:
${endereco || "Retirada no local"}

💳 Pagamento:
${pagamento}

💰 Total:
R$ ${total.toFixed(2).replace(".", ",")}
`;

  const numeroWhatsApp = "5511999999999";

  const link =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(link, "_blank");

});

calcularTotal();