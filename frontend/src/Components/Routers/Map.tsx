/* eslint-disable no-useless-concat */
import React, { Component, useState } from 'react'
import { areas } from './polygon'
import './Map.scss'

declare global {
  interface Window {
    kakao: any
  }
}
class Map extends Component {
  default = [
    {
      tradeNo: 0,
      uimg: '',
      unicname: '',
      tlist: '',
      ttitle: '',
      tarea: '',
      pprice: '',
      uno: 0
    }
  ]
  state = {
    address: '',
    trade: this.default
  } //   change = this.state.trade;
  user = JSON.parse(window.sessionStorage.getItem('user') || '{}')

  getAddress = (userAd: string) => {
    this.setState(() => {
      return { address: userAd }
    })
  }
  getTrade = async (area: string) => {
    await fetch('http://13.125.55.96:8080/trade/search/area/' + area + '?no=0', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        let data = json.data
        if (data != null) {
          this.setState(() => {
            return { trade: data }
          })
        } else {
          this.setState(() => {
            return { trade: this.default }
          })
        }
        console.log('fetch 안', data) // console.log(this.state.address);
        console.log(this.state.trade)
      })
      .catch(err => {
        console.log('에러다', err)
      })
  }
  componentWillMount() {
    this.getAddress(this.user.uarea[0].address)
  }
  componentDidMount() {
    console.log('did마운트 안', this.state.trade) // let infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 })
    let container = document.getElementById('map')
    let options = {
      center: new window.kakao.maps.LatLng(0, 0),
      level: 5
    }
    let my = this
    let map = new window.kakao.maps.Map(container, options)
    let customOverlay = new window.kakao.maps.CustomOverlay({
      yAnchor: 1.3
    })
    let infowindow = new window.kakao.maps.InfoWindow({ zindex: 1, removable: true })

    let marker = new window.kakao.maps.Marker({})
    let marker2 = new window.kakao.maps.Marker({})

    let geocoder = new window.kakao.maps.services.Geocoder()
    let addr = this.state.address
    let aGu = ''
    console.log('주소값', addr)
    for (let i = 0, len = areas.length; i < len; i++) {
      if (areas[i].dong === addr) {
        aGu = areas[i].gu
        displayMarker(areas[i])
        break
      }
    }
    for (let i = 0, len = areas.length; i < len; i++) {
      if (areas[i].gu === aGu) {
        displayArea(areas[i])
      }
    } // searchAddrFromCoords(map.getCenter(), displayCenterInfo); // 클릭 이벤트 발생 경우 마커의 좌표를 재지정 해준다.

    window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : ''
          detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>'

          let content = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + detailAddr + '</div>' // 마커를 클릭한 위치에 표시합니다

          marker2.setPosition(mouseEvent.latLng)
          marker2.setMap(map) // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다

          infowindow.setContent(content)
          infowindow.open(map, marker2)
        }
      })
    }) // 마커에 이벤트 등록 Mouseover 시 내 지역 표시

    let infoOver = new window.kakao.maps.InfoWindow({
      content: '<div style="padding:5px;font-size:10px">우리 동</div>'
    })
    window.kakao.maps.event.addListener(marker, 'mouseover', function() {
      infoOver.open(map, marker)
    }) // 마커에 마우스아웃 이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'mouseout', function() {
      // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
      infoOver.close()
    }) // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다 // window.kakao.maps.event.addListener(map, 'idle', function() { //   searchAddrFromCoords(map.getCenter(), displayCenterInfo); // });

    function searchAddrFromCoords(coords: any, callback: any) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
    }

    function searchDetailAddrFromCoords(coords: any, callback: any) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
    } // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다 // function displayCenterInfo(result: any, status: any) { //   if (status === window.kakao.maps.services.Status.OK) { //     let infoDiv = document.getElementById('centerAddr'); //     for (var i = 0; i < result.length; i++) { //       // 행정동의 region_type 값은 'H' 이므로 //       if (result[i].region_type === 'H') { //         infoDiv.innerHTML = result[i].address_name; //         break; //       } //     } //   } // } // End 클릭 이벤트 for Marker // 카카오에서 제공되는 라이브러리로 검색 결과를 불러와 마커를 표시하는 기능 // var ps = new window.kakao.maps.services.Places(); // ps.keywordSearch('삼성동',placesSearchCB); // function placesSearchCB(data:any,status:any,pagination:any) { //     if(status === window.kakao.maps.services.Status.OK){ //       let bounds = new window.kakao.maps.LatLngBounds(); //       for(let i=0;i<data.length;i++) { //         displayMarker(data[i]); //         bounds.extend(new window.kakao.maps.LatLng(data[i].y,data[i].x)); //       } //       map.setBounds(bounds); //     } // } // End 검색 결과 // 검색 결과를 통해 바운더리를 지정하고 맵에 마커 표시후 중앙점을 잡아주는 기능 // let geocoder = new window.kakao.maps.services.Geocoder(); // let callback = function(result: any, status: any) { //   if (status === window.kakao.maps.services.Status.OK) { //     console.log(result); //     let bounds = new window.kakao.maps.LatLngBounds(); //     for (let i = 0; i < result.length; i++) { //       displayMarker(result[i]); //       bounds.extend(new window.kakao.maps.LatLng(result[i].y, result[i].x)); //     } //     map.setBounds(bounds); //     let recenter = map.getCenter(); //     console.log(recenter); //   } // }; // geocoder.addressSearch('청담동', callback);

    function displayMarker(place: any) {
      console.log('플레이스', place)
      let bounds = new window.kakao.maps.LatLngBounds()
      for (let i = 0; i < place.path.length; i++) {
        bounds.extend(new window.kakao.maps.LatLng(place.path[i].Ha, place.path[i].Ga))
      }
      map.setBounds(bounds)
      marker = new window.kakao.maps.Marker({
        map: map,
        position: map.getCenter()
      })
      marker.setMap(map)
    }

    function displayArea(area: any) {
      let polygon = new window.kakao.maps.Polygon({
        map: map,
        path: area.path,
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: '#004c80', // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        fillColor: '#fff', // 채우기 색깔입니다
        fillOpacity: 0.1 // 채우기 불투명도 입니다
      }) // polygon.setMap(map); // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다 // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다

      let check: boolean = false
      window.kakao.maps.event.addListener(polygon, 'mouseover', (mouseEvent: any) => {
        // if (check === false) {
        //   my.getTrade(area.dong)
        //   check = true
        // }
        polygon.setOptions({ fillColor: '#09f' })

        customOverlay.setContent('<div class="area">' + area.dong + '</div>')

        customOverlay.setPosition(mouseEvent.latLng)
        customOverlay.setMap(map)
      }) // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다

      window.kakao.maps.event.addListener(polygon, 'mousemove', (mouseEvent: any) => {
        customOverlay.setPosition(mouseEvent.latLng) // infowindow.setPosition(mouseEvent.latLng);
      }) // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다 // 커스텀 오버레이를 지도에서 제거합니다

      window.kakao.maps.event.addListener(polygon, 'mouseout', () => {
        check = false
        polygon.setOptions({ fillColor: '#fff' })

        customOverlay.setMap(null)
      }) // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다

      window.kakao.maps.event.addListener(polygon, 'click', async (mouseEvent: any) => {
        await my.getTrade(area.dong)
        const trade = my.state.trade
        console.log('포문안 트레이드', trade)
        console.log('길이', trade.length)
        let content = '<div class="info">' + '   <div class="title">' + area.dong + '</div>'
        for (let i = 0; i < trade.length; i++) {
          console.log(trade[i])
          if (trade[i].ttitle.length > 0) content += '   <div class="size"> <ul><li>게시글 : ' + trade[i].ttitle.substring(0, 15) + '<br/>가격 :' + trade[i].pprice + '</li></ul> </div>'
        } // +'   <div class="size"> : ' + Math.floor(polygon.getArea()) + ' m<sup>2</sup></area>' + '</div>';
        let innerDiv = document.getElementById('centerAddr')
        if (innerDiv) {
          innerDiv.innerHTML = content
        } // infowindow.setContent(content);
        infowindow.setPosition(mouseEvent.latLng)
        infowindow.setMap(map)
      })
    }
  }
  render() {
    return (
      <div className="map">
                
        <div className="map_wrap">
                    
          <div id="map" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                        
            <div className="hAddr">
                            <span className="hTitle">지역 판매 게시글</span>
                            <span id="centerAddr"></span>
                          
            </div>
                      
          </div>
                  
        </div>
                {/* <div id="clickLatlng"></div> */}
              
      </div>
    )
  }
}

export default Map
