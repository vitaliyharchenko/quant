import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Button } from 'react-native';

const itemsList = [
  {
    id: '1',
    type: 'text',
    content: '<h1 className="mt-0">Основное утверждение динамики</h1><h2>Базовые вещи</h2><p className="card-text">Динамика рассматривает ваимное действие тел друг на друга, являющееся причиной изменения их движения.</p><p className="card-text">Так как движение рассматривается относительно других тел, то выбор системы отсчета является важным вопросом динамики.</p><blockquote className="blockquote">Наблюдение за природой говорит нам о том, что изменение скорости тела всегда вызывается воздействием других тел.</blockquote><h3>Еще более базовые вещи</h3><p className="card-text">Приведем пример из жизни. Пусть вы захотите резко побежать. Что позволяет вам резко ускориться? Если бы вы находились на гладком льду, вряд ли у вас получилось бы быстро набрать скорость, скорее вы бы упали. Так что ходим и бегаем мы благодаря взаимодействию с дорогой, трению подошвы обуви о поверхность контакта.</p><figure className="figure"><img className="figure-img img-fluid rounded" src="http://static.probusiness.by/n/0a/c/e-gorlovka_com_ua_1.jpg" /><figcaption className="figure-caption text-right">На улице бывает охренеть как скользко.</figcaption></figure><p className="card-text">В древней Греции ученые считали, что для поддержания скорости тела необходимо, чтобы кто-то или что-то постоянно воздействовало на него. Таким образом, единственным естественным состоянием тела считался покой. </p><p className="card-text">В действительности же <strong>свободное тело</strong> (тело, которое не взаимодействует с другими телами) может сохранять свою скорость сколь угодно долго, подобно кометам, рассекающим космическое пространство, или же оставаться в покое.</p><div className="embed-responsive embed-responsive-16by9 rounded"><iframe className="embed-responsive-item" src="https://www.youtube.com/embed/E6VIH5_H1yo?feature=oembed" allowfullscreen=""></iframe></div><p className="card-text">Автомобиль, набравший скорость и выключивший двигатель останавливается лишь благодаря воздействию сопротивления воздуха и трению механизмов трансмиссии друг о друга. Без трения скорость автомобиля оставалась бы постоянной.</p>',
  },
  {
    id: '2',
    type: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga dolorem voluptas, omnis?',
  },
  {
    id: '3',
    type: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus provident distinctio placeat, aspernatur non alias odit vero. Tempora quod sed, doloremque optio quis cum qui atque porro dignissimos architecto sequi earum necessitatibus at quidem, ad praesentium, ducimus magnam aliquid nobis. Et, quam.',
  }
]

export default class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu1.</Text>
        <Button
          title="Я прочитал"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
          data={itemsList}
          renderItem={({item}) => <Text>{item.content}</Text>}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
});
