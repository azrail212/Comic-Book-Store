<?php

class Config
{
    public static function DB_HOST()
    {
        return Config::get_env("DB_HOST", "webprojects-do-user-11616479-0.b.db.ondigitalocean.com");
    }
    public static function DB_USERNAME()
    {
        return Config::get_env("DB_USERNAME", "doadmin");
    }
    public static function DB_PASSWORD()
    {
        return Config::get_env("DB_PASSWORD", "17110000");
    }
    public static function DB_SCHEME()
    {
        return Config::get_env("DB_SCHEME", "comicbookstore");
    }
    public static function DB_PORT()
    {
        return Config::get_env("DB_PORT", "25060");
    }
    public static function JWT_SECRET()
    {
        return Config::get_env("JWT_SECRET", "ezcb9s8UcF");
    }

    public static function get_env($name, $default)
    {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
    }
}

?>
