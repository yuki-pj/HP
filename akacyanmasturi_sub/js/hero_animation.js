document.addEventListener("DOMContentLoaded", function () {
    const heroText = document.querySelector(".hero-text");
    if (!heroText) return;

    // 初期状態設定
    // テキストの下準備（少し下に配置して隠すなど）
    gsap.set(".hero-text, .hero-logo", {
        y: 50,
        opacity: 0
    });

    // メインビジュアルの初期状態（少し拡大して透明に）
    gsap.set(".mv", {
        scale: 1.2,
        opacity: 0,
        transformOrigin: "center center"
    });


    // GSAPのタイムライン機能を使って動きを順番に実行
    const tl = gsap.timeline({ delay: 0.5 });

    tl
        // 1. テキストの出現（全体が下からスライドアップ）
        .to(".hero-text, .hero-logo", {
            duration: 1.5,
            y: 0,
            opacity: 1,
            ease: "power4.out"
        })

        // 2. 待機（読み終わるまで少し止める）
        .to({}, { duration: 0.2 })

        // 3. ローダー背景（カーテン）の退場（上にスライド）
        .to("#opening-loader", {
            duration: 1.0,
            y: "-100%", // 上にスライドアウト
            ease: "power4.inOut", // 高級感のあるイージング
        })

        // 4. メインビジュアルの登場（カーテンが上がると同時にズームアウトしながらフェードイン）
        .to(".mv", {
            duration: 1.5,
            scale: 1.0,
            opacity: 1,
            ease: "power2.out"
        }, "-=1.0") // カーテンのアニメーションの途中（残り1.0秒のところ）から開始

        // 完了処理
        .eventCallback("onComplete", function () {
            document.querySelector("#opening-loader").style.display = 'none';
        });
});
