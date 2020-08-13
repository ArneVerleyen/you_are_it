/**
 * A MapBox wrapper
 * docs: https://docs.mapbox.com/mapbox-gl-js/api/
 *
 * @author Tim De Paepe <tim.depaepe@arteveldehs.be>
 */

import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

class MapBox {
  constructor(apiKey, options = {}) {
    // set the apiKey & accessToken
    this.apiKey = apiKey;
    mapboxgl.accessToken = this.apiKey;

    // set the options (in case nothing was added, get the defaultOptions)
    this.options = Object.keys(options).length === 0 ? this.getDefaultOptions() : options;

    // create a new mapbox instance
    this.map = new mapboxgl.Map(this.options);
  }

  getDefaultOptions() {
    return {
      container: 'mapbox',
      style: 'mapbox://styles/ziekemapbox/ck3zv6bai4or01ck0xvx5nc17',
      zoom: 13,
    };
  }

  getMap() {
    return this.map;
  }

  goTo(long, lat) {
    this.map.jumpTo({ center: [long, lat] });
  }

  flyTo(long, lat) {
    this.map.jumpTo({ center: [long, lat] });
    this.map.zoomTo(14);
  }

  displayPlayer(coords, mail) {
    if (document.contains(document.getElementById(mail))) {
      document.getElementById(mail).remove();
    }
    const img = document.createElement('img');
    img.src = '../../assets/icons/cirkel.png';
    img.style.width = '35px';
    img.style.height = '35px';
    img.id = mail;
    new mapboxgl.Marker(img)
      .setLngLat(coords)
      .addTo(this.getMap());
  }

  displayTagger(coords, mail) {
    if (document.contains(document.getElementById(mail))) {
      document.getElementById(mail).remove();
    }
    const img = document.createElement('img');
    img.src = '../../assets/icons/Tikker.png';
    img.style.width = '35px';
    img.style.height = 'auto';
    img.id = mail;
    new mapboxgl.Marker(img)
      .setLngLat(coords)
      .addTo(this.getMap());
  }
}

export default MapBox;
