class AppConfig {
    public readonly baseUrl = import.meta.env.VITE_API_URL;
    public readonly theatersUrl = this.baseUrl + "getAllTheaters";
    public readonly moviesPerTheaterUrl = this.baseUrl + "movies-per-theaters/";
    public readonly addMovieUrl = this.baseUrl + "movie";
    public readonly getOneMovieUrl = this.baseUrl + "movie/"
    public readonly updateMovieUrl = this.baseUrl + "updateMovie/";
    public readonly deleteMovieUrl = this.baseUrl + "movie/";

    public readonly recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
}

export const appConfig = new AppConfig();
