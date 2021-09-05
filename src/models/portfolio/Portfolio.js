export class Portfolio {

    constructor(slug, props) {
        this.slug = slug;
        this.name = props.name ?? "";
        this.coverImage = props.coverImage ?? null;
        this.url = props.url ?? null;

        this.shortDescription = props.shortDescription ?? "";
        this.longDescription = props.longDescription ?? "";

        this.workplace = props.workplace ?? "";
        this.projectRole = props.projectRole ?? "";
        this.roleDescription = props.roleDescription ?? [];

        this.members = props.members ?? [];
        this.screenshots = props.screenshots ?? [];
    }

}