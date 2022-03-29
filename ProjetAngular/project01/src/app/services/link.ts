export class Link {
    public title : string;
    public url? : string;

    constructor(
        title : string,
        url? : string,
        )
    {
        this.title = title;
        this.url = url;
    }
}
