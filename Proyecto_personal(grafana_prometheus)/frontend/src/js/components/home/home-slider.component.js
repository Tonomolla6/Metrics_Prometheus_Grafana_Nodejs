class homeSliderCtrl {
    constructor() {
        "ngInject";
        this.imgInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [{
                image: 'https://cdn.pixabay.com/photo/2017/01/22/22/37/gambling-2001128_1280.jpg',
                titulo: "BingoKing",
                text: "The best online bingo of the moment.",
                button: {
                    text: "Register now",
                    url: "#!/register"
                },
                id: 0
            },
            {
                image: 'https://cdn.pixabay.com/photo/2015/10/23/15/28/game-bank-1003151_1280.jpg',
                titulo: "Are you already registered?",
                text: "Win games in our star game.",
                button: {
                    text: "Play now",
                    url: "#!/login"
                },
                id: 1
            },
            {
                image: 'https://cdn.pixabay.com/photo/2019/05/04/16/55/gambling-4178462_1280.jpg',
                titulo: "Do you want to see who are the most famous winners of our platform?",
                text: "Follow them to see all their publications!",
                button: {
                    text: "Top Winners",
                    url: "#!/winners"
                },
                id: 2
            }
        ]
    }
}

let HomeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'components/home/home-slider.html'
};

export default HomeSlider;