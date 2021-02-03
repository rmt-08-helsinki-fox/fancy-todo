//@ts-check
function generateCard(payload) {
    return `
        <div>
            ${payload.test}
        </div>
        <button id="${payload.id}" click="${payload.handler}">
            ${payload.button_text}
        </button>
    `
}
// button kalau diteken, handler buat callback di luar > apa yang dilakukan?
