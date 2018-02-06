// Dependencies ---------------------------------------------------------------
import { Data } from "../data";
import { Link } from "../link";

// Item implementation --------------------------------------------------------
/**
 * An Item represents a record in a Collection+JSON response.
 */
export class Item {
    /**
     * URL to the Item
     */
    href?: string;

    /**
     * Key-Value pairs representing the Item
     */
    data?: Data[];

    /**
     * Additional links in connection with the Item
     */
    links?: Link[];
}