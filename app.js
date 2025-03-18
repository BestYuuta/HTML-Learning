document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];

            for (let i = 0; i < 50; i++) {
                this.particles.push(new Particle(this.x, this.y));
            }
        }

        update() {
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.alpha <= 0) {
                    this.particles.splice(index, 1);
                }
            });
        }

        draw() {
            this.particles.forEach((particle) => particle.draw());
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 2;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.alpha = 1;
            this.fade = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.fade;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        });
        requestAnimationFrame(animate);
    }

    function createFirework(event) {
        fireworks.push(new Firework(event.clientX, event.clientY));
    }

    document.querySelector("button").addEventListener("click", function (event) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createFirework(event), i * 200);
        }
    });

    animate();
});

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("button");
    const container = document.querySelector(".container");

    // Danh sách thông điệp ngẫu nhiên
    const messages = [
        "Chúc em bé sinh nhật zui zẻeee 😊",
        "Mong rằng mọi điều tốt đẹp nhất sẽ đến với em bé của anh! 🌟",
        "Em bé luôn tỏa sáng đối với anh!!! ✨",
        "Hôm nay là ngày tuyệt vời nhất dành cho cục cưngg! 🎉",
        "Chúc em bé luôn mạnh khỏe và hạnh phúc! 💖",
        "Cảm ơn em bé vì đã xuất hiện trên thế giới này!:3333 🌍",
        "Hãy luôn mỉm cười, vì Xư rất đẹp khi cười! 😍",
        "Thành công sẽ đến với cục cưng nhỏ xíu Minh Xư :3 🚀",
        "Chúc ebe iu và được iu siu siu nhìuuuu 💕",
        "Chúc em bé luôn vui vẻ, bình an và hạnh phúc thiệt nhìuu! 💕",
        "Cảm ơn thế giới vì đã mang đến một bảo bối đáng yêu như Xư! 🌎💫",
        "Nhớ luôn cười thật tươi vì nụ cười của em bé là đẹp nhất trần đời! 😍",
        "Chúc Xư nhỏ bé đạt được mọi ước mơ và bay cao bay xa nhen! 🚀💙",
        "Ebe iu ơi, hôm nay là ngày của em bé, hãy tận hưởng trọn vẹn nhaaa! 🎈🥳",
        "TẶNG 1 VÉ YÊU CẦU ANH LÀM GÌ CŨNG ĐƯỢC TRONG KHẢ NĂNG CỦA ANHHHHH >////<",
        "TẶNG ANH 1 VÉ YÊU CẦU EM LÀM GÌ CŨNG ĐƯỢC TRONG KHẢ NĂNG CỦA EBE >////<",
    ];

    button.addEventListener("click", function () {
        document.querySelectorAll(".gift-box").forEach(gift => gift.remove());
        document.querySelectorAll(".message-box").forEach(msg => msg.remove());

        let giftCount = parseInt(document.querySelector("input[type='number']").value);

        if (isNaN(giftCount) || giftCount <= 0) {
            alert("Vui lòng nhập số lượng hộp quà hợp lệ!");
            return;
        }

        for (let i = 0; i < giftCount; i++) {
            createGiftBox(i);
        }
    });

    function createGiftBox(index) {
        let giftBox = document.createElement("div");
        giftBox.className = "gift-box";
        giftBox.innerText = "🎁"; 


        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 100);
        giftBox.style.left = `${x}px`;
        giftBox.style.top = `${y}px`;


        giftBox.addEventListener("click", function () {
            showMessage(messages[index % messages.length]); 
            giftBox.remove(); 
        });

        document.body.appendChild(giftBox);
    }

    function showMessage(text) {
        let messageBox = document.createElement("div");
        messageBox.className = "message-box";
        messageBox.innerText = text;

        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.classList.add("hide");
            setTimeout(() => messageBox.remove(), 500); 
        }, 3000);
    }
});
