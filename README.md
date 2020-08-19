# [chinese-timer](https://hearkour.github.io/chinese-timer/)

### WIP ; Currently a prototype!

중국어 수업 시간에 사용할 수 있을(?) 중국어 타이머.

## To-do:

<details>
  <summary>선택지 만들기:</summary>
  <br>
  
  - 제한시간설정
  - 선 색상(원고지, 팔레트?)
  - 글 밝기(전반적)
  - ❌원고지투명도
  - 움직이는 배경? 배경색상투명도?
  - fps 조절...?
  > ~~커밋 커밋 커몬~~
</details>

<details>
  <summary>Note to self:</summary>
  
  ```javascript
  // Maybe this will be in later use
  // currently a removed temp func:

  function isActiveClass(className) {
      let active = false;
      document.activeElement.classList.forEach(activeClass => {
          if (activeClass == className) { active = true; return; }
      });
      return active;
  }
  ```
</details>
