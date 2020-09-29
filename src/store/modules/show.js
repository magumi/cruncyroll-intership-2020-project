import axios from "axios";

const showModule = {
  state: () => ({
    showDescription: {
      title: "",
      description: "",
      image: "",
      id: 1,
      slug: "",
      rating: 0,
      trailer: "",
      nrEpisodes: 0
    },
    episode: {
      title: "",
      number: 0,
      thumbnail: ""
    },
    episodeList: []
  }),
  mutations: {
    saveShowDescription: function (state, { attributes, id }) {
      state.showDescription = {
        title: attributes.canonicalTitle,
        description: attributes.description,
        image: attributes.posterImage.original,
        id: id,
        rating: attributes.averageRating,
        slug: attributes.slug,
        trailer: attributes.youtubeVideoId,
        nrEpisodes: attributes.episodeCount
      };
    },
    saveEpisodes: function (state, { attributes }) {
      state.episode = {
        title: attributes.canonicalTitle,
        number: attributes.number,
        thumbnail: attributes.thumbnail.original
      };
      state.episodeList.push(state.episode);
    },
    saveNullEpisodes: function (state) {
      state.episode = {
        title: "",
        number: 0,
        thumbnail: ""
      };
    },
    saveCastings: function (state) {
      state.cast = {};
    },
    deleteEpisodes: function (state) {
    //  if (state.episodeList.size() > 0) {
        console.log(state.episodeList);
     
    }
  },
  actions: {
    fetchShowDescription: function (context, payload) {
      const id = payload.id;
      axios
        .get("https://kitsu.io/api/edge/anime?filter[id]=" + id)
        .then(function ({ data }) {
          context.commit("saveShowDescription", data.data[0]);
        });
    },
    fetchEpisodes: function (context, payload) {
      this.offset = 0;
      const nrEpisodes = 1;
      for (let i = 0; i < nrEpisodes; i++) {
        axios
          .get(
            "https://kitsu.io/api/edge/anime/" +
              payload.id +
              "/episodes?page[limit]=10&page[offset]=" +
              this.offset
          )
          .then(function ({ data }) {
            for (let j = 0; j < 10; j++) {
              context.commit("saveEpisodes", data.data[j]);
            }
          });
        this.offset += 10;
      }
    },
    fetchCast: function (context, payload) {
      axios
        .get("https://kitsu.io/api/edge/anime/" + payload.id + "/castings")
        .then(function ({ data }) {
          context.commit("saveCastings", data.data[0]);
        });
    }
  }
};

export default showModule;
