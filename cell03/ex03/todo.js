// --- ส่วนจัดการ Cookie และ JSON ---

function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    // แปลงข้อมูลเป็น JSON String ก่อนบันทึก
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [key, val] = c.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return "";
}

// ฟังก์ชันดึงข้อมูลจากหน้าเว็บมาแปลงเป็น JSON เพื่อบันทึก
function saveTodos() {
    const list = [];
    document.querySelectorAll("#ft_list div").forEach(d => {
        list.push(d.textContent);
    });
    // ใช้ JSON.stringify เพื่อแปลง Array เป็น String
    setCookie("todos", JSON.stringify(list));
}

// --- ส่วนจัดการหน้าจอ (UI) ---

function addTodo(text, isInitialLoad = false) {
    let div = document.createElement("div");
    div.textContent = text;

    div.onclick = function () {
        if (confirm("ต้องการลบรายการนี้ใช่หรือไม่?")) {
            div.remove();
            saveTodos();
        }
    };

    let list = document.getElementById("ft_list");
    list.prepend(div);

    if (!isInitialLoad) {
        saveTodos();
    }
}

function newTodo() {
    let text = prompt("เพิ่มรายการใหม่:");
    if (text && text.trim() !== "") {
        addTodo(text.trim());
    }
}

// เมื่อโหลดหน้าเว็บ ให้ดึง JSON จาก Cookie มา Parse กลับเป็น Array
window.onload = function () {
    let data = getCookie("todos");
    if (data) {
        try {
            // ใช้ JSON.parse เพื่อแปลงข้อความกลับเป็น Array ของ JavaScript
            let todoArray = JSON.parse(data);
            todoArray.reverse().forEach(t => addTodo(t, true));
        } catch (e) {
            console.error("เกิดข้อผิดพลาดในการอ่านข้อมูล JSON", e);
        }
    }
};