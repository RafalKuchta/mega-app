// import striptags from "striptags";

export function registeredNewUserInfo(user) {
    // const email = striptags(user);
    return `
<h1>Rejestracja nowego użytkownika!</h1>
<p>Zarejestrowano nowego użytkownika ${user}!</p>
`;
}