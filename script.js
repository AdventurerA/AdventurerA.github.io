
        const canvas = document.getElementById("stars");
        const ctx = canvas.getContext("2d");
        let stars = [];
        let shootingStars = [];
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        const skills = ["JavaScript", "Python", "SQL", "Machine Learning", "Astrophysics", "Data", "Automation", "Advanced Mathematics"];

        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * (h - 150);
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > w || this.y < 0 || this.y > h - 150) this.reset();
            }
            draw() {
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function initStars() {
            stars = [];
            for (let i = 0; i < 150; i++) stars.push(new Star());
        }
        function animate() {
            ctx.clearRect(0, 0, w, h);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
            requestAnimationFrame(animate);
        }
        function createShootingStar() {
            const skill = skills[Math.floor(Math.random() * skills.length)];
            const star = document.createElement("div");
            star.classList.add("shooting-star");
            star.textContent = skill;
            document.body.appendChild(star);
            let x = Math.random() * w;
            let y = Math.random() * h * 0.5;
            let speed = 2 + Math.random() * 3;
            star.style.top = y + "px";
            star.style.left = x + "px";
            let interval = setInterval(() => {
                x += speed * 2;
                y += speed;
                star.style.top = y + "px";
                star.style.left = x + "px";
                if (x > w || y > h) {
                    clearInterval(interval);
                    star.remove();
                }
            }, 20);
        }
        setInterval(() => {
            if (Math.random() < 0.2) createShootingStar(); // 20% chance every few seconds
        }, 3000);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            initStars();
        });

        initStars();
        animate();
