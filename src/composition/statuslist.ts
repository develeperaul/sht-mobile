export function useStatus(
  status:
    | 'fresh'
    | 'pending'
    | 'paid'
    | 'cancelled'
    | 'completed'
    | 'waiting_review'
    | ''
) {
  const statusNaming = computed(() => {
    if (status === 'fresh') return 'Новый'
    if (status === 'pending') return 'Ожидает предоплаты' // на главной выходит ссылка на оплату и в карточке пред пут выходи кнопка
    if (status === 'paid') return 'Оплачено' // возможность загрузить док (билеты) появляется чат путеш (необязательно )
    if (status === 'cancelled') return 'Отменен' //
    if (status === 'waiting_review') return 'Ожидает отзыва' // кнопка ожидает отзыва
    if (status === 'completed') return 'Завершен' //
  })
  return statusNaming
}
