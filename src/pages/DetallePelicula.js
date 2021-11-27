import React, { Component } from "react";
import axios from "axios";
import "../styles/DetallePelicula.css";

class DetallePelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
  }

  async componentDidMount() {
    const idString = this.props.location.pathname;
    const idStringSplited = idString.split("/");
    const id = parseInt(idStringSplited[2], 10);

    let self = this;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=89771290e51674556a8c70fb8c707e8c&language=es-ES`,
        {}
      )
      .then(function (response) {
        const movie = response;
        self.setState({
          movie,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const priceSplitter = (number) =>
      number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    console.log();
    return (
      <div className="fondo">
        <div className={"detalles__container"}>
          <h2 style={{ color: "white" }}>
            {" "}
            🎞 {this.state.movie.data && this.state.movie.data.title}
          </h2>
          <div className="card">
            <div className="row">
            <div className="col-4">
            <p className={"texto__titulo_descripcion"}>Poster</p>
               <div>
                <img src={`https://image.tmdb.org/t/p/w500${this.state.movie.data && this.state.movie.data.poster_path}`} alt="poster" />
                </div>
            </div>
            <div className="col-8 scroll">
            <ul className="list-group list-group-flush" style={{backgroundColor: "#ffffff00"}}>
            <li className="list-group-item" style={{backgroundColor: "#ffffff00"}}>
                <div className="row">
                    <div className="col">
                            <p className={"texto__titulo_descripcion"}>Sinópsis</p>{" "}
                            <p className={"texto__descripcion"}>
                                {this.state.movie.data && this.state.movie.data.overview}
                            </p>
                    </div>
                </div>
              </li>
              <li className="list-group-item" style={{backgroundColor: "#ffffff00"}}>
                    <p className={"texto__titulo_descripcion"}>Presupuesto</p>
                    <p className={"texto__descripcion"}>
                      {priceSplitter(
                        this.state.movie.data && this.state.movie.data.budget
                      )}{" "}
                      $
                    </p>
              </li>
              <li className="list-group-item" style={{backgroundColor: "#ffffff00"}}>
                  <div className="row">
                      <div className="col">
                        <p className={"texto__titulo_descripcion"}>Website</p>
                        {this.state.movie.data &&
                            this.state.movie.data.homepage !== null ? (
                            <p>
                            <a target={"blank"} href={this.state.movie.data && this.state.movie.data.homepage}>
                                {this.state.movie.data && this.state.movie.data.homepage}
                            </a>
                            </p>
                            ) : (
                            <p>No posee</p>
                        )}
                      </div>
                      <div className="col">
                        <p className={"texto__titulo_descripcion"}>
                         Fecha de lanzamiento
                        </p>{" "}
                         <p>
                        {this.state.movie.data && this.state.movie.data.release_date}
                        </p>
                      </div>
                  </div>
              </li>
            </ul>
            </div>
            </div>
          </div>
          <div className={"boton_volver__container"}>
              <br/>
            <button type="button" className="btn btn-primary btn-volver" onClick={(e) => {e.preventDefault(); this.props.history.push(`/`);}}>
              <p className={"texto__btn_volver"}>Volver</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetallePelicula;
