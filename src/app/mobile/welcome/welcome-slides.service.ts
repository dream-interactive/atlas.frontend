import { Injectable } from "@angular/core";

@Injectable()
export class WelcomeSlidesService {
    private slide1 = `<GridLayout row="0" rows="*, 2*, *">
<GridLayout width="57%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <Label class="lobster-regular carousel-item-head" text="Welcome to Payments App" textWrap="true"></Label>
</GridLayout>
<GridLayout class="carousel-item-circle" row="1" horizontalAlignment="center" verticalAlignment="center">
    <Label class="fa carousel-item-icon" text="&#xf19c;" textWrap="true"></Label>
</GridLayout>
<GridLayout width="49%" row="2" horizontalAlignment="center" verticalAlignment="center">
    <Label class="opensans-regular carousel-item-desc" text="Let's see a quick overview of our features." textWrap="true"></Label>
</GridLayout>
</GridLayout>
`;

    private slide2 = `<GridLayout row="0" rows="*, 2*, *">
<GridLayout width="56%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <Label class="lobster-regular carousel-item-head" text="Simple & Fast" textWrap="true"></Label>
</GridLayout>
<GridLayout class="carousel-item-circle" row="1" horizontalAlignment="center" verticalAlignment="center">
    <Label class="fa carousel-item-icon" text="&#xf1d8;" textWrap="true"></Label>
</GridLayout>
<GridLayout width="49%" row="2" horizontalAlignment="center" verticalAlignment="center">
    <Label class="opensans-regular carousel-item-desc" text="It is easy to use and makes transactions quick even while you are on the move." textWrap="true"></Label>
</GridLayout>
</GridLayout>
`;

    private slide3 = `<GridLayout row="0" rows="*, 2*, *">
<GridLayout width="56%" row="0" horizontalAlignment="center" verticalAlignment="center">
    <Label class="lobster-regular carousel-item-head" text="Safe & Secure" textWrap="true"></Label>
</GridLayout>
<GridLayout class="carousel-item-circle" row="1" horizontalAlignment="center" verticalAlignment="center">
    <Label class="fa carousel-item-icon" text="&#xf132;" textWrap="true"></Label>
</GridLayout>
<GridLayout width="49%" row="2" horizontalAlignment="center" verticalAlignment="center">
    <Label class="opensans-regular carousel-item-desc" text="Every transaction made through Payments App is secure." textWrap="true"></Label>
</GridLayout>
</GridLayout>
`;

    private slides;
    constructor() {
        this.slides = [this.slide1, this.slide2, this.slide3];
    }

    getSlides(): any {
        return this.slides;
    }
}
