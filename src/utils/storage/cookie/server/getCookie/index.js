import { parseCookies } from "nookies";

export default function getCookieByServerSide(req, name) {
    const { [name]: value } = parseCookies({ req });

    return value;
}
